import * as path from 'path';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { AbstractHttpAdapter, IHTTPSettings, Logger, Application } from '@cmmv/core';
import fastifyStatic from '@fastify/static';
import fastifyCompress from '@fastify/compress';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyView from '@fastify/view';
import { ControllerRegistry } from '../utils/controller-registry.utils';
import { v4 as uuidv4 } from 'uuid';

export class FastifyAdapter extends AbstractHttpAdapter<FastifyInstance> {
    private logger: Logger = new Logger('FastifyAdapter');

    constructor(instance?: FastifyInstance) {
        super(instance || require('fastify')());
    }

    public async init(application: Application, settings?: IHTTPSettings) {
        const publicDir = path.join(process.cwd(), 'public');
        this.application = application;

        this.instance.register(fastifyCompress);
        this.instance.register(fastifyCors);
        this.instance.register(fastifyHelmet, { contentSecurityPolicy: false });
        this.instance.register(fastifyStatic, {
            root: path.join(publicDir, "assets"),
            prefix: '/assets',
        });

        this.instance.register(fastifyView, {
            engine: { ejs: require("@cmmv/view") },
            root: publicDir,
            defaultContext: {},
            propertyName: 'view'
        });

        this.setMiddleware();
        this.registerControllers();
        this.initHttpServer(settings);
    }

    public initHttpServer(options?: any) {
        const isHttpsEnabled = options && options.httpsOptions;
        this.httpServer = isHttpsEnabled
            ? require('https').createServer(options.httpsOptions, this.instance)
            : require('http').createServer(this.instance);
    }

    private setMiddleware() {
        this.instance.addHook('onRequest', async (request, reply) => {
            const nonce = uuidv4();
            const nonceData = uuidv4();

            reply.header('Content-Security-Policy', `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'nonce-${nonceData}' 'unsafe-eval';`);
            reply.header('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
            reply.header('X-Content-Type-Options', 'nosniff');
            reply.header('X-Frame-Options', 'SAMEORIGIN');
            reply.header('X-XSS-Protection', '0');

            if (['POST', 'PUT', 'DELETE'].includes(request.method)) {
                reply.removeHeader("X-DNS-Prefetch-Control");
                reply.removeHeader("X-Download-Options");
                reply.removeHeader("X-Permitted-Cross-Domain-Policies");
                reply.removeHeader("Strict-Transport-Security");
                reply.removeHeader("Content-Security-Policy");
                reply.removeHeader("Cross-Origin-Opener-Policy");
                reply.removeHeader("Cross-Origin-Resource-Policy");
                reply.removeHeader("Origin-Agent-Cluster");
                reply.removeHeader("Referrer-Policy");
            }
        });
    }

    private registerControllers() {
        const controllers = ControllerRegistry.getControllers();

        controllers.forEach(([controllerClass, metadata]) => {
            const paramTypes = Reflect.getMetadata('design:paramtypes', controllerClass) || [];
            const instances = paramTypes.map((paramType: any) => this.application.providersMap.get(paramType.name));
    
            const instance = new controllerClass(...instances);
            const prefix = metadata.prefix;
            const routes = metadata.routes;
            
            routes.forEach(route => {
                const fullPath = `/${prefix}${route.path ? '/' + route.path : ''}`;
                const method = route.method.toLowerCase();

                this.instance[method](fullPath, async (req: FastifyRequest, reply: FastifyReply) => {
                    const startTime = Date.now();

                    try {
                        const args = this.buildRouteArgs(req, reply, route.params);
                        const result = await instance[route.handlerName](...args);

                        const processingTime = Date.now() - startTime;

                        reply.send({
                            status: 'success',
                            processingTime,
                            data: result,
                        });
                    } catch (error) {
                        const processingTime = Date.now() - startTime;

                        reply.status(500).send({
                            status: 'error',
                            processingTime,
                            message: error.message || 'Internal Server Error'
                        });
                    }
                });
            });
        });
    }

    private buildRouteArgs(req: FastifyRequest, reply: FastifyReply, params: any[]) {
        const args: any[] = [];
        params?.forEach(param => {
            const [paramType, paramName] = param.paramType.split(':');
            switch (paramType) {
                case 'body': args[param.index] = req.body; break;
                case 'param': args[param.index] = req.params[paramName]; break;
                case 'query': args[param.index] = req.query[paramName]; break;
                case 'queries': args[param.index] = req.query; break;
                case 'header': args[param.index] = req.headers[paramName.toLowerCase()]; break;
                case 'headers': args[param.index] = req.headers; break;
                case 'request': args[param.index] = req; break;
                case 'response': args[param.index] = reply; break;
                default: args[param.index] = undefined; break;
            }
        });
        return args;
    }

    public listen(bind: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const [host, port] = bind.split(':');

            this.instance.listen(parseInt(port, 10), host, (err?: any) => {
                if (err) 
                    return reject(err);
                
                resolve();
            });
        });
    }

    public connected() {
        return this.instance.server.listening;
    }

    public close() {
        if (!this.httpServer) 
            return undefined;

        return new Promise((resolve, reject) => {
            this.httpServer.close(() => resolve(""));
        });
    }
}
