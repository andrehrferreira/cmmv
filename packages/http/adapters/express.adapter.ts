import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import * as https from 'https';
import { Duplex } from 'stream';
import { v4 as uuidv4 } from 'uuid';

import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from 'cors';
import * as session from 'express-session';
import helmet from "helmet";

import { AbstractHttpAdapter, IHTTPSettings, Logger, Application, Telemetry, Config } from "@cmmv/core";
import { CMMVRenderer } from "@cmmv/view";
import { ControllerRegistry } from '../utils/controller-registry.utils';
import { ServiceRegistry } from '../utils';

export interface ExpressRequest extends express.Request{
    requestId?: string;
}

export class ExpressAdapter extends AbstractHttpAdapter<http.Server | https.Server> {
    private logger: Logger = new Logger("ExpressAdapter");
    protected readonly openConnections = new Set<Duplex>();
    protected render: CMMVRenderer = new CMMVRenderer();

    constructor(protected instance?: any) {        
        super(instance || express());
    }

    public async init(application: Application, settings?:IHTTPSettings) {
        const publicDir = path.join(process.cwd(), 'public');
        this.application = application;
        
        this.instance = this.instance || express();
        this.instance.disable('x-powered-by');
        this.instance.use(compression({ level: 6 }));
        this.instance.use(express.static(publicDir));
        this.instance.set('views', publicDir);
        this.instance.set('view engine', 'html');
        this.instance.engine('html', (filePath, options, callback) => {
            this.render.renderFile(filePath, options, { nonce: options.nonce || "" }, callback);
        });
        this.instance.use(express.json());
        this.instance.use(bodyParser.json({limit: "50mb"}));
        this.instance.use(bodyParser.urlencoded({
            limit: "50mb", 
            extended: true
        }));
        this.instance.use(cors());
        this.instance.use(helmet({ contentSecurityPolicy: false }));
        this.instance.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: { secure: true }
        }));

        this.setMiddleware();
        this.registerControllers();
        this.initHttpServer(settings);       
    }

    public initHttpServer(options: any) {
        const isHttpsEnabled = options && options.httpsOptions;

        if (isHttpsEnabled) {
            this.httpServer = https.createServer(
                options.httpsOptions,
                this.instance,
            );
        } 
        else {
            this.httpServer = http.createServer(this.instance);
        }

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
        this.instance.use((req, res, next) => {
            req.requestId = uuidv4();
            Telemetry.start('Request Process', req.requestId);
            
            res.locals.nonce = uuidv4().substring(0, 8);    
            const customHeaders = Config.get("headers") || {};
    
            for (const headerName in customHeaders) {
                let headerValue = customHeaders[headerName];
    
                if (Array.isArray(headerValue)) {
                    headerValue = headerValue.map(value => {
                        if (headerName === "Content-Security-Policy") 
                            return `${value} 'nonce-${res.locals.nonce}'`;
                        
                        return value;
                    }).join("; ");
                } else if (typeof headerValue === "string") {
                    if (headerName === "Content-Security-Policy") 
                        headerValue = `${headerValue} 'nonce-${res.locals.nonce}'`;                    
                }
    
                res.setHeader(headerName, headerValue);
            }
    
            if (req.method === 'GET') {
                res.setHeader("Strict-Transport-Security", "max-age=15552000; includeSubDomains");
                res.setHeader("X-Content-Type-Options", "nosniff");
                res.setHeader("X-Frame-Options", "SAMEORIGIN");
                res.setHeader("X-XSS-Protection", "0");
            }
    
            if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
                res.removeHeader("X-DNS-Prefetch-Control");
                res.removeHeader("X-Download-Options");
                res.removeHeader("X-Permitted-Cross-Domain-Policies");
                res.removeHeader("Strict-Transport-Security");
                res.removeHeader("Content-Security-Policy");
                res.removeHeader("Cross-Origin-Opener-Policy");
                res.removeHeader("Cross-Origin-Resource-Policy");
                res.removeHeader("Origin-Agent-Cluster");
                res.removeHeader("Referrer-Policy");
            }
    
            next();
        });
    
        this.instance.get('*', (req, res, next) => {
            const publicDir = path.join(process.cwd(), 'public/views');
            const requestPath = req.path === '/' ? 'index' : req.path.substring(1);
            const ext = path.extname(req.path);
    
            if (req.path.indexOf(".html") === -1 && req.path !== "/")
                return next();

            const possiblePaths = [
                path.join(publicDir, `${requestPath}.html`),
                path.join(publicDir, requestPath, 'index.html'),
                path.join(publicDir, `${requestPath}`),
                path.join(publicDir, requestPath, 'index.html')
            ];
    
            let fileFound = false;
    
            for (const filePath of possiblePaths) {
                if (fs.existsSync(filePath)) {
                    fileFound = true;
                    const debugFilePath = path.resolve(require.resolve('@cmmv/view'), '../src/debug.html');
                    const debugContent = process.env.NODE_ENV === "dev" ? fs.readFileSync(debugFilePath, "utf-8") : "";
    
                    return res.render(filePath, {
                        debug: debugContent,
                        nonce: res.locals.nonce,
                        services: ServiceRegistry.getServicesArr()
                    });
                }
            }
    
            if (!fileFound)
                res.status(404).send('Page not found');
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
    
                this.instance[method](fullPath, async (req: ExpressRequest, res: express.Response, next: any) => {
                    const startTime = Date.now();
                    
                    try {
                        const args = this.buildRouteArgs(req, res, next, route.params);
    
                        Telemetry.start('Controller Handler', req.requestId);
                        const result = await instance[route.handlerName](...args);
                        Telemetry.end('Controller Handler', req.requestId);
    
                        const processingTime = Date.now() - startTime;
                        Telemetry.end('Request Process', req.requestId);
                        const telemetry = Telemetry.getTelemetry(req.requestId);

                        if(this.isJson(result)) {
                            let response = {
                                status: 200,
                                processingTime,
                                data: result
                            }
    
                            if(req.query.debug){
                                response['requestId'] = req.requestId;
                                response['telemetry'] = telemetry;
                            }
                                    
                            res.json(response);
                        }
                        else if(result) 
                            res.status(200).send(result);                        
                    } 
                    catch (error) {
                        const processingTime = Date.now() - startTime; 
                        Telemetry.end('Request Process', req.requestId);
                        const telemetry = Telemetry.getTelemetry(req.requestId);

                        let response = {
                            status: 500,
                            processingTime,
                            message: error.message || 'Internal Server Error',
                        }

                        if(req.query.debug){
                            response['requestId'] = req.requestId;
                            response['telemetry'] = telemetry;
                        }
    
                        res.status(500).json(response);
                    }

                    Telemetry.clearTelemetry(req.requestId);
                });
            });
        });
    }
    
    private buildRouteArgs(req: express.Request | any, res: express.Response, next: any, params: any[]) {
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
                case 'response': args[param.index] = res; break;
                case 'next': args[param.index] = next; break;
                case 'session': args[param.index] = req.session; break;
                case 'ip': args[param.index] = req.ip; break;
                case 'hosts': args[param.index] = req.hosts; break;
                default: args[param.index] = undefined; break;
            }
        });

        return args;
    }
    
    public listen(bind: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const [host, port] = bind.split(':');

            this.httpServer.listen(parseInt(port, 10), host, (err?: any) => {
                if (err) 
                    return reject(err);
                
                resolve();
            });
        });
    }

    public connected(){
        return this.instance.enabled;
    }

    public close() {
        this.closeOpenConnections();
    
        if (!this.httpServer) 
          return undefined;
        
        return new Promise((resolve, reject) => {
            if(this.connected()){
                try {
                    this.httpServer.close((err) => {
                        if(err) reject(err)
                        else resolve("");
                    });
                }
                catch(err){
                    reject(err)
                }
            }
            else {
                resolve("");
            }            
        });
    }
}