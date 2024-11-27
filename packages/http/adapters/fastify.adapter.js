"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastifyAdapter = void 0;
const fs = require("fs");
const path = require("path");
const static_1 = require("@fastify/static");
const compress_1 = require("@fastify/compress");
const cors_1 = require("@fastify/cors");
const helmet_1 = require("@fastify/helmet");
const view_1 = require("@fastify/view");
const secure_session_1 = require("@fastify/secure-session");
const core_1 = require("@cmmv/core");
const view_2 = require("@cmmv/view");
const controller_registry_utils_1 = require("../utils/controller-registry.utils");
const uuid_1 = require("uuid");
class FastifyAdapter extends core_1.AbstractHttpAdapter {
    constructor(instance) {
        super(instance || require('fastify')());
        this.logger = new core_1.Logger('FastifyAdapter');
        this.openConnections = new Set();
        this.render = new view_2.CMMVRenderer();
    }
    async init(application, settings) {
        const publicDir = path.join(process.cwd(), 'public');
        this.application = application;
        this.instance.register(compress_1.default);
        this.instance.register(static_1.default, {
            root: publicDir,
            prefix: '/assets',
        });
        this.instance.register(view_1.default, {
            engine: { ejs: require('@cmmv/view') },
            root: publicDir,
            defaultContext: {},
            propertyName: 'view',
        });
        this.instance.register(require('@fastify/formbody'));
        this.instance.register(cors_1.default);
        this.instance.register(helmet_1.default, { contentSecurityPolicy: false });
        this.instance.register(secure_session_1.default, {
            secret: core_1.Config.get('sessionSecret') || '',
            cookieName: core_1.Config.get('sessionCookieName') || 'cmmv-session',
        });
        this.setMiddleware();
        this.registerControllers();
        this.initHttpServer(settings);
    }
    async initHttpServer(options) {
        await this.instance.listen(options.port || 3000, options.host || '0.0.0.0');
    }
    setMiddleware() {
        this.instance.addHook('onRequest', async (request, reply) => {
            request.requestId = (0, uuid_1.v4)();
            core_1.Telemetry.start('Request Process', request.requestId);
            const nonce = (0, uuid_1.v4)().substring(0, 8);
            request.nonce = nonce;
            const customHeaders = core_1.Config.get('headers') || {};
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
                }
                else if (typeof headerValue === 'string') {
                    if (headerName === 'Content-Security-Policy')
                        headerValue = `${headerValue} 'nonce-${nonce}'`;
                }
                reply.header(headerName, headerValue);
            }
            if (request.method === 'GET') {
                reply.header('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
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
        });
        this.instance.get('*', async (request, reply) => {
            const publicDir = path.join(process.cwd(), 'public/views');
            const requestPath = request.url === '/' ? 'index' : request.url.substring(1);
            const ext = path.extname(request.url);
            if ((ext || ext !== '.html') && requestPath !== 'index')
                return reply.callNotFound();
            const possiblePaths = [
                path.join(publicDir, `${requestPath}.html`),
                path.join(publicDir, requestPath, 'index.html'),
            ];
            for (const filePath of possiblePaths) {
                if (fs.existsSync(filePath)) {
                    return reply.type('text/html').send(await this.render.renderFile(filePath, {
                        nonce: request.nonce,
                    }, {}, () => { }));
                }
            }
            reply.status(404).send('Page not found');
        });
    }
    registerControllers() {
        const controllers = controller_registry_utils_1.ControllerRegistry.getControllers();
        controllers.forEach(([controllerClass, metadata]) => {
            const paramTypes = Reflect.getMetadata('design:paramtypes', controllerClass) || [];
            const instances = paramTypes.map((paramType) => this.application.providersMap.get(paramType.name));
            const instance = new controllerClass(...instances);
            const prefix = metadata.prefix;
            const routes = metadata.routes;
            routes.forEach(route => {
                const fullPath = `/${prefix}${route.path ? '/' + route.path : ''}`;
                const method = route.method.toLowerCase();
                if (this.instance[method]) {
                    this.instance[method](fullPath, async (req, reply) => {
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
                        }
                        catch (error) {
                            console.error(error);
                            const processingTime = Date.now() - startTime;
                            reply.status(500).send({
                                status: 'error',
                                processingTime,
                                message: error.message ||
                                    'Internal Server Error',
                            });
                        }
                    });
                }
            });
        });
    }
    buildRouteArgs(req, reply, params) {
        const args = [];
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
    listen(bind) {
        return new Promise((resolve, reject) => {
            const [host, port] = bind.split(':');
            this.instance.listen(parseInt(port, 10), host, (err) => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
    connected() {
        return this.instance.server && this.instance.server.listening;
    }
    close() {
        if (!this.httpServer)
            return undefined;
        return this.httpServer.close();
    }
}
exports.FastifyAdapter = FastifyAdapter;
