import * as fs from 'node:fs';
import * as path from 'node:path';
import * as http from 'node:http';
import * as https from 'node:https';
import * as crypto from 'node:crypto';
import { Duplex } from 'node:stream';
import { v4 as uuidv4 } from 'uuid';

import cmmv, { serverStatic, json, urlencoded } from '@cmmv/server';
import compression from '@cmmv/compression';
import cors from '@cmmv/cors';
import cookieParser from '@cmmv/cookie-parser';
import etag from '@cmmv/etag';
import helmet from '@cmmv/helmet';

import {
    AbstractHttpAdapter,
    IHTTPSettings,
    Logger,
    Application,
    Telemetry,
    Config,
    ServiceRegistry,
    Module,
} from '@cmmv/core';

import { CMMVRenderer } from '@cmmv/view';
import { ControllerRegistry } from './controller.registry';

export class DefaultAdapter extends AbstractHttpAdapter<
    http.Server | https.Server
> {
    private logger: Logger = new Logger('DefaultAdapter');
    protected readonly openConnections = new Set<Duplex>();
    protected render: CMMVRenderer = new CMMVRenderer();
    protected vite: any;

    constructor(protected instance?: any) {
        super(instance || cmmv());
    }

    public async init(application: Application, settings?: IHTTPSettings) {
        const publicDir = path.join(process.cwd(), 'public');
        this.application = application;

        this.instance = this.instance || cmmv();

        if (!Config.get<boolean>('server.poweredBy', false))
            this.instance.disable('x-powered-by');

        if (Config.get<boolean>('server.compress.enabled', true))
            this.instance.use(compression({ level: 6 }));

        await this.setVite();

        this.instance.use(
            serverStatic(publicDir, {
                setHeaders: (res, path) => {
                    if (path.endsWith('.html')) {
                        res.setHeader('Cache-Control', 'no-cache');
                    } else if (
                        path.endsWith('.vue') ||
                        path.endsWith('.cmmv')
                    ) {
                        res.setHeader('Content-Type', 'text/javascript');
                    } else {
                        res.setHeader(
                            'Cache-Control',
                            'public, max-age=31536000, immutable',
                        );
                    }
                },
            }),
        );

        this.instance.set('views', publicDir);
        this.instance.set('view engine', 'html');
        this.instance.engine('html', (filePath, options, callback) => {
            this.render.renderFile(
                filePath,
                options,
                { nonce: options.nonce || '' },
                callback,
            );
        });
        this.instance.use(cookieParser());
        this.instance.use(etag({ algorithm: 'fnv1a' }));
        this.instance.use(json({ limit: '50mb' }));
        this.instance.use(urlencoded({ limit: '50mb', extended: true }));

        if (Config.get<boolean>('server.cors', true)) this.instance.use(cors());

        if (Config.get<boolean>('server.helmet.enabled', true)) {
            this.instance.use(
                helmet(
                    Config.get('server.helmet.options', {
                        contentSecurityPolicy: false,
                    }),
                ),
            );
        }

        this.setMiddleware();
        this.registerControllers();
        this.initHttpServer(settings);
    }

    public initHttpServer(options: any) {
        const isHttpsEnabled = options && options.httpsOptions;

        this.httpServer = this.instance.server;

        if (!this.httpServer) throw new Error('Unable to start HTTP adapter');

        this.trackOpenConnections();
    }

    private trackOpenConnections() {
        this.httpServer.on('connection', (socket: Duplex) => {
            this.openConnections.add(socket);
            socket.on('close', () => this.openConnections.delete(socket));
        });
    }

    private closeOpenConnections() {
        for (const socket of this.openConnections) {
            socket.destroy();
            this.openConnections.delete(socket);
        }
    }

    private setMiddleware() {
        this.instance.addHook('onRequest', (req, res, next) => {
            req.requestId = uuidv4();
            res.locals = {};
            res.locals.nonce = uuidv4().substring(0, 8);
            const customHeaders = Config.get('headers') || {};

            for (const headerName in customHeaders) {
                let headerValue = customHeaders[headerName];

                if (Array.isArray(headerValue)) {
                    headerValue = headerValue
                        .map(value => {
                            if (headerName === 'Content-Security-Policy')
                                return value.indexOf('style-src') == -1
                                    ? `${value} 'nonce-${res.locals.nonce}'`
                                    : value;

                            return value;
                        })
                        .join('; ');
                } else if (typeof headerValue === 'string') {
                    if (headerName === 'Content-Security-Policy')
                        headerValue =
                            headerValue.indexOf('style-src') == -1
                                ? `${headerValue} 'nonce-${res.locals.nonce}'`
                                : headerValue;
                }

                res.setHeader(headerName, headerValue);
            }

            if (req.method === 'GET') {
                if (!Config.get<boolean>('server.removePolicyHeaders', false)) {
                    res.setHeader(
                        'Strict-Transport-Security',
                        'max-age=15552000; includeSubDomains',
                    );
                    res.setHeader('X-Content-Type-Options', 'nosniff');
                    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
                    res.setHeader('X-XSS-Protection', '0');
                }
            }

            if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
                if (!Config.get<boolean>('server.removePolicyHeaders', false)) {
                    res.removeHeader('X-DNS-Prefetch-Control');
                    res.removeHeader('X-Download-Options');
                    res.removeHeader('X-Permitted-Cross-Domain-Policies');
                    res.removeHeader('Strict-Transport-Security');
                    res.removeHeader('Content-Security-Policy');
                    res.removeHeader('Cross-Origin-Opener-Policy');
                    res.removeHeader('Cross-Origin-Resource-Policy');
                    res.removeHeader('Origin-Agent-Cluster');
                    res.removeHeader('Referrer-Policy');
                }
            }

            Telemetry.start('Request Process', req.requestId);
            const publicDir = path.join(process.cwd(), 'public/views');
            const requestPath =
                req.path === '/' ? 'index' : req.path.substring(1);
            const ext = path.extname(req.path);

            if (req.path.indexOf('.html') === -1 && req.path !== '/')
                return next();

            const possiblePaths = [
                path.join(publicDir, `${requestPath}.html`),
                path.join(publicDir, requestPath, 'index.html'),
                path.join(publicDir, `${requestPath}`),
                path.join(publicDir, requestPath, 'index.html'),
            ];

            let fileFound = false;

            for (const filePath of possiblePaths) {
                if (fs.existsSync(filePath)) {
                    fileFound = true;
                    const config = Config.getAll();

                    return res.render(filePath, {
                        nonce: res.locals.nonce,
                        services: ServiceRegistry.getServicesArr(),
                        requestId: req.requestId,
                        config,
                    });
                }
            }

            if (!fileFound) res.code(404).send('Page not found');

            next();
        });
    }

    private async setVite() {
        const useVite = Config.get<boolean>('server.vite', false);
        const hasViteModule = Module.hasModule('vite');

        if (useVite && hasViteModule) {
            const { createServer } = await import('vite');
            const configFilePathJs = path.join(
                process.cwd(),
                'vite.config.mjs',
            );
            const configFilePathTs = path.join(
                process.cwd(),
                'vite.config.mts',
            );

            this.vite = await createServer({
                configFile: fs.existsSync(configFilePathTs)
                    ? configFilePathTs
                    : configFilePathJs,
                root: process.cwd(),
                clearScreen: false,
                appType: 'custom',
                server: {
                    middlewareMode: true,
                },
                resolve: {
                    alias: {
                        '/public': path.join(process.cwd(), 'public'),
                        '/assets': path.join(process.cwd(), 'public/assets'),
                    },
                },
            });

            this.instance.addHook('onRequest', (req, res, next) => {
                if (
                    req.url?.startsWith('/src/') ||
                    req.url?.startsWith('/node_modules/') ||
                    req.url?.startsWith('/public/') ||
                    req.url?.startsWith('/assets/') ||
                    req.url?.endsWith('.vue') ||
                    req.url?.endsWith('.cmmv')
                ) {
                    const originalSetHeader = res.res.setHeader;
                    res.res.setHeader = (name: string, value: string) => {
                        if (name.toLowerCase() === 'content-type' && !value)
                            value = 'text/javascript';

                        if (res.res)
                            originalSetHeader.call(res.res, name, value);
                    };

                    this.vite.middlewares(req.req, res.res, (err: any) => {
                        if (err) {
                            this.logger.error(err);
                            res.statusCode = 500;
                            res.end(err.message);
                        }
                    });
                } else {
                    next();
                }
            });
        }
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
                    const handler = async (req: any, res: any, next: any) => {
                        const startTime = Date.now();

                        try {
                            req.contextId = crypto
                                .createHash('md5')
                                .update(`${req.method}::${req.path}`)
                                .digest('hex');

                            if (
                                Application.appModule.httpInterceptors.length >
                                0
                            ) {
                                for (const interceptor of Application.appModule
                                    .httpInterceptors) {
                                    const breakProcess = await interceptor(
                                        `${req.method}::${req.path}`.toLocaleLowerCase(),
                                        {
                                            req,
                                            res,
                                            next,
                                            handler:
                                                instance[route.handlerName],
                                        },
                                    );

                                    if (breakProcess) return;
                                }
                            }

                            const args = this.buildRouteArgs(
                                req,
                                res,
                                next,
                                route.params,
                            );

                            Telemetry.start(
                                'Controller Handler',
                                req.requestId,
                            );

                            const result = await instance[route.handlerName](
                                ...args,
                            );

                            Telemetry.end('Controller Handler', req.requestId);

                            const processingTime = Date.now() - startTime;
                            Telemetry.end('Request Process', req.requestId);
                            const telemetry = Telemetry.getTelemetry(
                                req.requestId,
                            );

                            if (this.isJson(result)) {
                                const response = {
                                    status: 200,
                                    processingTime,
                                    data: result,
                                };

                                if (req.query.debug) {
                                    response['requestId'] = req.requestId;
                                    response['telemetry'] = telemetry;
                                }

                                if (
                                    Application.appModule.httpAfterRender
                                        .length > 0
                                ) {
                                    for (const afterRender of Application
                                        .appModule.httpAfterRender) {
                                        await afterRender(
                                            `${req.method}::${req.path}`.toLocaleLowerCase(),
                                            {
                                                req,
                                                res,
                                                next,
                                                handler:
                                                    instance[route.handlerName],
                                                content: response,
                                            },
                                        );
                                    }
                                }

                                res.json(response);
                            } else if (result) {
                                if (
                                    Application.appModule.httpAfterRender
                                        .length > 0
                                ) {
                                    for (const afterRender of Application
                                        .appModule.httpAfterRender) {
                                        await afterRender(
                                            `${req.method}::${req.path}`.toLocaleLowerCase(),
                                            {
                                                req,
                                                res,
                                                next,
                                                handler:
                                                    instance[route.handlerName],
                                                content: result,
                                            },
                                        );
                                    }
                                }

                                res.status(200).send(result);
                            }
                        } catch (error) {
                            console.error(error);
                            const processingTime = Date.now() - startTime;
                            Telemetry.end('Request Process', req.requestId);
                            const telemetry = Telemetry.getTelemetry(
                                req.requestId,
                            );

                            const response = {
                                status: 500,
                                processingTime,
                                message:
                                    error.message || 'Internal Server Error',
                            };

                            if (req.query.debug) {
                                response['requestId'] = req.requestId;
                                response['telemetry'] = telemetry;
                            }

                            res.code(500).json(response);
                        }

                        Telemetry.clearTelemetry(req.requestId);
                    };

                    if (route.middlewares) {
                        this.instance[method](
                            fullPath,
                            route.middlewares,
                            handler,
                        );
                    } else {
                        this.instance[method](fullPath, handler);
                    }
                }
            });
        });
    }

    private buildRouteArgs(req: any, res: any, next: any, params: any[]) {
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
                    args[param.index] = res;
                    break;
                case 'next':
                    args[param.index] = next;
                    break;
                case 'session':
                    args[param.index] = req.session;
                    break;
                case 'ip':
                    args[param.index] = req.ip;
                    break;
                case 'hosts':
                    args[param.index] = req.hosts;
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

            this.instance
                .listen({ port: parseInt(port, 10), host })
                .then(server => resolve())
                .catch(err => reject(err));
        });
    }

    public connected() {
        return this.instance.enabled;
    }

    public close() {
        this.closeOpenConnections();

        if (!this.httpServer) return undefined;

        return new Promise(async (resolve, reject) => {
            if (this.connected()) {
                try {
                    this.httpServer.close(err => {
                        if (err) reject(err);
                        else resolve('');
                    });

                    if (this.vite) await this.vite.close();
                } catch (err) {
                    reject(err);
                }
            } else {
                resolve('');
            }
        });
    }
}
