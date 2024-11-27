"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultAdapter = void 0;
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const uuid_1 = require("uuid");
const server_1 = require("@cmmv/server");
const compression_1 = require("@cmmv/compression");
const cors_1 = require("@cmmv/cors");
const cookie_parser_1 = require("@cmmv/cookie-parser");
const etag_1 = require("@cmmv/etag");
const helmet_1 = require("@cmmv/helmet");
const core_1 = require("@cmmv/core");
const view_1 = require("@cmmv/view");
const controller_registry_utils_1 = require("../utils/controller-registry.utils");
class DefaultAdapter extends core_1.AbstractHttpAdapter {
    constructor(instance) {
        super(instance || (0, server_1.default)());
        this.instance = instance;
        this.logger = new core_1.Logger('DefaultAdapter');
        this.openConnections = new Set();
        this.render = new view_1.CMMVRenderer();
    }
    async init(application, settings) {
        const publicDir = path.join(process.cwd(), 'public');
        this.application = application;
        this.instance = this.instance || (0, server_1.default)();
        if (!core_1.Config.get('server.poweredBy', false))
            this.instance.disable('x-powered-by');
        if (core_1.Config.get('server.compress.enabled', true))
            this.instance.use((0, compression_1.default)({ level: 6 }));
        await this.setVite();
        this.instance.use((0, server_1.serverStatic)(publicDir, {
            setHeaders: (res, path) => {
                if (path.endsWith('.html')) {
                    res.setHeader('Cache-Control', 'no-cache');
                }
                else if (path.endsWith('.vue') ||
                    path.endsWith('.cmmv')) {
                    res.setHeader('Content-Type', 'text/javascript');
                }
                else {
                    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
                }
            },
        }));
        this.instance.set('views', publicDir);
        this.instance.set('view engine', 'html');
        this.instance.engine('html', (filePath, options, callback) => {
            this.render.renderFile(filePath, options, { nonce: options.nonce || '' }, callback);
        });
        this.instance.use((0, cookie_parser_1.default)());
        this.instance.use((0, etag_1.default)({ algorithm: 'fnv1a' }));
        this.instance.use((0, server_1.json)({ limit: '50mb' }));
        this.instance.use((0, server_1.urlencoded)({ limit: '50mb', extended: true }));
        if (core_1.Config.get('server.cors', true))
            this.instance.use((0, cors_1.default)());
        if (core_1.Config.get('server.helmet.enabled', true)) {
            this.instance.use((0, helmet_1.default)(core_1.Config.get('server.helmet.options', {
                contentSecurityPolicy: false,
            })));
        }
        this.setMiddleware();
        this.registerControllers();
        this.initHttpServer(settings);
    }
    initHttpServer(options) {
        const isHttpsEnabled = options && options.httpsOptions;
        this.httpServer = this.instance.server;
        if (!this.httpServer)
            throw new Error('Unable to start HTTP adapter');
        this.trackOpenConnections();
    }
    trackOpenConnections() {
        this.httpServer.on('connection', (socket) => {
            this.openConnections.add(socket);
            socket.on('close', () => this.openConnections.delete(socket));
        });
    }
    closeOpenConnections() {
        for (const socket of this.openConnections) {
            socket.destroy();
            this.openConnections.delete(socket);
        }
    }
    setMiddleware() {
        this.instance.addHook('onRequest', (req, res, next) => {
            req.requestId = (0, uuid_1.v4)();
            res.locals = {};
            res.locals.nonce = (0, uuid_1.v4)().substring(0, 8);
            const customHeaders = core_1.Config.get('headers') || {};
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
                }
                else if (typeof headerValue === 'string') {
                    if (headerName === 'Content-Security-Policy')
                        headerValue =
                            headerValue.indexOf('style-src') == -1
                                ? `${headerValue} 'nonce-${res.locals.nonce}'`
                                : headerValue;
                }
                res.setHeader(headerName, headerValue);
            }
            if (req.method === 'GET') {
                if (!core_1.Config.get('server.removePolicyHeaders', false)) {
                    res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
                    res.setHeader('X-Content-Type-Options', 'nosniff');
                    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
                    res.setHeader('X-XSS-Protection', '0');
                }
            }
            if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
                if (!core_1.Config.get('server.removePolicyHeaders', false)) {
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
            core_1.Telemetry.start('Request Process', req.requestId);
            const publicDir = path.join(process.cwd(), 'public/views');
            const requestPath = req.path === '/' ? 'index' : req.path.substring(1);
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
                    const config = core_1.Config.getAll();
                    return res.render(filePath, {
                        nonce: res.locals.nonce,
                        services: core_1.ServiceRegistry.getServicesArr(),
                        requestId: req.requestId,
                        config,
                    });
                }
            }
            if (!fileFound)
                res.code(404).send('Page not found');
            next();
        });
    }
    async setVite() {
        const useVite = core_1.Config.get('server.vite', false);
        const hasViteModule = core_1.Module.hasModule('vite');
        if (useVite && hasViteModule) {
            const { createServer } = await Promise.resolve().then(() => require('vite'));
            const configFilePathJs = path.join(process.cwd(), 'vite.config.mjs');
            const configFilePathTs = path.join(process.cwd(), 'vite.config.mts');
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
                if (req.url?.startsWith('/src/') ||
                    req.url?.startsWith('/node_modules/') ||
                    req.url?.startsWith('/public/') ||
                    req.url?.startsWith('/assets/') ||
                    req.url?.endsWith('.vue') ||
                    req.url?.endsWith('.cmmv')) {
                    const originalSetHeader = res.res.setHeader;
                    res.res.setHeader = (name, value) => {
                        if (name.toLowerCase() === 'content-type' && !value)
                            value = 'text/javascript';
                        if (res.res)
                            originalSetHeader.call(res.res, name, value);
                    };
                    this.vite.middlewares(req.req, res.res, (err) => {
                        if (err) {
                            this.logger.error(err);
                            res.statusCode = 500;
                            res.end(err.message);
                        }
                    });
                }
                else {
                    next();
                }
            });
        }
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
                    const handler = async (req, res, next) => {
                        const startTime = Date.now();
                        try {
                            req.contextId = crypto
                                .createHash('md5')
                                .update(`${req.method}::${req.path}`)
                                .digest('hex');
                            if (core_1.Application.appModule.httpInterceptors.length >
                                0) {
                                for (const interceptor of core_1.Application.appModule
                                    .httpInterceptors) {
                                    const breakProcess = await interceptor(`${req.method}::${req.path}`.toLocaleLowerCase(), {
                                        req,
                                        res,
                                        next,
                                        handler: instance[route.handlerName],
                                    });
                                    if (breakProcess)
                                        return;
                                }
                            }
                            const args = this.buildRouteArgs(req, res, next, route.params);
                            core_1.Telemetry.start('Controller Handler', req.requestId);
                            const result = await instance[route.handlerName](...args);
                            core_1.Telemetry.end('Controller Handler', req.requestId);
                            const processingTime = Date.now() - startTime;
                            core_1.Telemetry.end('Request Process', req.requestId);
                            const telemetry = core_1.Telemetry.getTelemetry(req.requestId);
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
                                if (core_1.Application.appModule.httpAfterRender
                                    .length > 0) {
                                    for (const afterRender of core_1.Application
                                        .appModule.httpAfterRender) {
                                        await afterRender(`${req.method}::${req.path}`.toLocaleLowerCase(), {
                                            req,
                                            res,
                                            next,
                                            handler: instance[route.handlerName],
                                            content: response,
                                        });
                                    }
                                }
                                res.json(response);
                            }
                            else if (result) {
                                if (core_1.Application.appModule.httpAfterRender
                                    .length > 0) {
                                    for (const afterRender of core_1.Application
                                        .appModule.httpAfterRender) {
                                        await afterRender(`${req.method}::${req.path}`.toLocaleLowerCase(), {
                                            req,
                                            res,
                                            next,
                                            handler: instance[route.handlerName],
                                            content: result,
                                        });
                                    }
                                }
                                res.status(200).send(result);
                            }
                        }
                        catch (error) {
                            console.error(error);
                            const processingTime = Date.now() - startTime;
                            core_1.Telemetry.end('Request Process', req.requestId);
                            const telemetry = core_1.Telemetry.getTelemetry(req.requestId);
                            const response = {
                                status: 500,
                                processingTime,
                                message: error.message || 'Internal Server Error',
                            };
                            if (req.query.debug) {
                                response['requestId'] = req.requestId;
                                response['telemetry'] = telemetry;
                            }
                            res.code(500).json(response);
                        }
                        core_1.Telemetry.clearTelemetry(req.requestId);
                    };
                    if (route.middlewares) {
                        this.instance[method](fullPath, route.middlewares, handler);
                    }
                    else {
                        this.instance[method](fullPath, handler);
                    }
                }
            });
        });
    }
    buildRouteArgs(req, res, next, params) {
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
    listen(bind) {
        return new Promise((resolve, reject) => {
            const [host, port] = bind.split(':');
            this.instance
                .listen({ port: parseInt(port, 10), host })
                .then(server => resolve())
                .catch(err => reject(err));
        });
    }
    connected() {
        return this.instance.enabled;
    }
    close() {
        this.closeOpenConnections();
        if (!this.httpServer)
            return undefined;
        return new Promise(async (resolve, reject) => {
            if (this.connected()) {
                try {
                    this.httpServer.close(err => {
                        if (err)
                            reject(err);
                        else
                            resolve('');
                    });
                    if (this.vite)
                        await this.vite.close();
                }
                catch (err) {
                    reject(err);
                }
            }
            else {
                resolve('');
            }
        });
    }
}
exports.DefaultAdapter = DefaultAdapter;
