import * as fs from 'fs';
import * as path from 'path';
import { Duplex } from 'stream';

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyCompress from '@fastify/compress';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyView from '@fastify/view';
import fastifySecureSession from '@fastify/secure-session';

import {
    AbstractHttpAdapter,
    IHTTPSettings,
    Logger,
    Application,
    Telemetry,
    Config,
} from '@cmmv/core';
import { CMMVRenderer } from '@cmmv/view';
import { ControllerRegistry } from '../utils/controller-registry.utils';
import { v4 as uuidv4 } from 'uuid';

export interface FastifyRequestCustom extends FastifyRequest {
    requestId?: string;
    nonce?: string;
}

export class FastifyAdapter extends AbstractHttpAdapter<FastifyInstance> {
    private logger: Logger = new Logger('FastifyAdapter');
    protected readonly openConnections = new Set<Duplex>();
    protected render: CMMVRenderer = new CMMVRenderer();

    constructor(instance?: FastifyInstance) {
        super(instance || require('fastify')());
    }

    public async init(application: Application, settings?: IHTTPSettings) {
        const publicDir = path.join(process.cwd(), 'public');
        this.application = application;

        this.instance.register(fastifyCompress);
        this.instance.register(fastifyStatic, {
            root: publicDir,
            prefix: '/assets',
        });
        this.instance.register(fastifyView, {
            engine: { ejs: require('@cmmv/view') },
            root: publicDir,
            defaultContext: {},
            propertyName: 'view',
        });
        this.instance.register(require('@fastify/formbody'));
        this.instance.register(fastifyCors);
        this.instance.register(fastifyHelmet, { contentSecurityPolicy: false });

        this.instance.register(fastifySecureSession, {
            secret: Config.get<string>('sessionSecret') || '',
            cookieName:
                Config.get<string>('sessionCookieName') || 'cmmv-session',
        });

        this.setMiddleware();
        this.registerControllers();
        this.initHttpServer(settings);
    }

    public async initHttpServer(options: any) {
        await this.instance.listen(
            options.port || 3000,
            options.host || '0.0.0.0',
        );
    }

    private setMiddleware() {
        this.instance.addHook(
            'onRequest',
            async (request: FastifyRequestCustom, reply: FastifyReply) => {
                request.requestId = uuidv4();
                Telemetry.start('Request Process', request.requestId);

                const nonce = uuidv4().substring(0, 8);
                request.nonce = nonce;

                const customHeaders = Config.get('headers') || {};

                for (const headerName in customHeaders) {
                    let headerValue = customHeaders[headerName];

                    if (Array.isArray(headerValue)) {
                        headerValue = headerValue
                            .map(value => {
                                if (headerName === 'Content-Security-Policy')
                                    return `${value} 'nonce-${nonce}'`;

                                return value;
                            })
                            .join('; ');
                    } else if (typeof headerValue === 'string') {
                        if (headerName === 'Content-Security-Policy')
                            headerValue = `${headerValue} 'nonce-${nonce}'`;
                    }

                    reply.header(headerName, headerValue);
                }

                if (request.method === 'GET') {
                    reply.header(
                        'Strict-Transport-Security',
                        'max-age=15552000; includeSubDomains',
                    );
                    reply.header('X-Content-Type-Options', 'nosniff');
                    reply.header('X-Frame-Options', 'SAMEORIGIN');
                    reply.header('X-XSS-Protection', '0');
                }

                if (['POST', 'PUT', 'DELETE'].includes(request.method)) {
                    reply.removeHeader('X-DNS-Prefetch-Control');
                    reply.removeHeader('X-Download-Options');
                    reply.removeHeader('X-Permitted-Cross-Domain-Policies');
                    reply.removeHeader('Strict-Transport-Security');
                    reply.removeHeader('Content-Security-Policy');
                    reply.removeHeader('Cross-Origin-Opener-Policy');
                    reply.removeHeader('Cross-Origin-Resource-Policy');
                    reply.removeHeader('Origin-Agent-Cluster');
                    reply.removeHeader('Referrer-Policy');
                }
            },
        );

        this.instance.get(
            '*',
            async (request: FastifyRequestCustom, reply: FastifyReply) => {
                const publicDir = path.join(process.cwd(), 'public/views');
                const requestPath =
                    request.url === '/' ? 'index' : request.url.substring(1);
                const ext = path.extname(request.url);

                if ((ext || ext !== '.html') && requestPath !== 'index')
                    return reply.callNotFound();

                const possiblePaths = [
                    path.join(publicDir, `${requestPath}.html`),
                    path.join(publicDir, requestPath, 'index.html'),
                ];

                for (const filePath of possiblePaths) {
                    if (fs.existsSync(filePath)) {
                        const debugFilePath = path.resolve(
                            require.resolve('@cmmv/view'),
                            '../src/debug.html',
                        );
                        const debugContent =
                            process.env.NODE_ENV === 'dev'
                                ? fs.readFileSync(debugFilePath, 'utf-8')
                                : '';

                        return reply.type('text/html').send(
                            await this.render.renderFile(
                                filePath,
                                {
                                    debug: debugContent,
                                    nonce: request.nonce,
                                },
                                {},
                                () => {},
                            ),
                        );
                    }
                }

                reply.status(404).send('Page not found');
            },
        );
    }

    private registerControllers() {
        const controllers = ControllerRegistry.getControllers();

        controllers.forEach(([controllerClass, metadata]) => {
            const paramTypes =
                Reflect.getMetadata('design:paramtypes', controllerClass) || [];
            const instances = paramTypes.map((paramType: any) =>
                this.application.providersMap.get(paramType.name),
            );

            const instance = new controllerClass(...instances);
            const prefix = metadata.prefix;
            const routes = metadata.routes;

            routes.forEach(route => {
                const fullPath = `/${prefix}${route.path ? '/' + route.path : ''}`;
                const method = route.method.toLowerCase();

                if (this.instance[method]) {
                    this.instance[method](
                        fullPath,
                        async (
                            req: FastifyRequestCustom,
                            reply: FastifyReply,
                        ) => {
                            const startTime = Date.now();

                            try {
                                const args = this.buildRouteArgs(
                                    req,
                                    reply,
                                    route.params,
                                );
                                const result = await instance[
                                    route.handlerName
                                ](...args);

                                const processingTime = Date.now() - startTime;

                                reply.send({
                                    status: 'success',
                                    processingTime,
                                    data: result,
                                });
                            } catch (error) {
                                console.error(error);
                                const processingTime = Date.now() - startTime;

                                reply.status(500).send({
                                    status: 'error',
                                    processingTime,
                                    message:
                                        error.message ||
                                        'Internal Server Error',
                                });
                            }
                        },
                    );
                }
            });
        });
    }

    private buildRouteArgs(
        req: FastifyRequest,
        reply: FastifyReply,
        params: any[],
    ) {
        const args: any[] = [];
        params?.forEach(param => {
            const [paramType, paramName] = param.paramType.split(':');
            switch (paramType) {
                case 'body':
                    args[param.index] = req.body;
                    break;
                case 'param':
                    args[param.index] = req.params[paramName];
                    break;
                case 'query':
                    args[param.index] = req.query[paramName];
                    break;
                case 'queries':
                    args[param.index] = req.query;
                    break;
                case 'header':
                    args[param.index] = req.headers[paramName.toLowerCase()];
                    break;
                case 'headers':
                    args[param.index] = req.headers;
                    break;
                case 'request':
                    args[param.index] = req;
                    break;
                case 'response':
                    args[param.index] = reply;
                    break;
                case 'next':
                    args[param.index] = null;
                    break;
                case 'session':
                    args[param.index] = req.session;
                    break;
                case 'ip':
                    args[param.index] = req.ip;
                    break;
                case 'hosts':
                    args[param.index] = req.hostname || req.headers['host'];
                    break;
                default:
                    args[param.index] = undefined;
                    break;
            }
        });
        return args;
    }

    public listen(bind: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const [host, port] = bind.split(':');

            this.instance.listen(parseInt(port, 10), host, (err?: any) => {
                if (err) return reject(err);

                resolve();
            });
        });
    }

    public connected() {
        return this.instance.server && this.instance.server.listening;
    }

    public close() {
        if (!this.httpServer) return undefined;

        return this.httpServer.close();
    }
}
