import * as fs from 'fs';
import * as path from 'path';
import * as fastify from 'fastify';
import { createHash } from 'crypto';

import fastifyStatic from '@fastify/static';
import fastifyCompress from '@fastify/compress';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyView from '@fastify/view';

import { AbstractHttpAdapter, IHTTPSettings, Logger } from "@cmmv/core";

import { ControllerRegistry } from '../utils/controller-registry.utils';

export class FastifyAdapter implements AbstractHttpAdapter {
    private logger: Logger = new Logger("FastifyAdapter");
    private server: any;

    constructor(settings: IHTTPSettings) {
        const publicDir = path.join(process.cwd(), 'public');

        this.server = fastify(settings ? settings : {});
        this.server.decorateRequest('x-powered-by', false);

        this.server.register(fastifyStatic, {
            root: path.join(publicDir, "assets"),
            prefix: '/assets', 
            etag: true,         
            lastModified: true  
        });

        this.server.register(fastifyView, {
            engine: { ejs: require("@cmmv/view") },
            root: publicDir,
            defaultContext: {},
            propertyName: 'view'
        });

        this.server.register(fastifyCompress);
        this.server.register(fastifyCors);
        this.server.register(fastifyHelmet, { contentSecurityPolicy: true });

        this.setMiddleware(publicDir);
    }

    public use(middlaware: any) {
        this.server.register(middlaware);
    }

    public getHttpServer() {
        return this.server;
    }

    private setMiddleware(publicDir: string) {
        this.server.get('/*', async (req, reply: any) => {
            try{
                const requestPath = req.url === '/' ? 'index' : req.url.substring(1);
                const ext = path.extname(req.url);

                if (ext && ext !== '.html') 
                    return reply.callNotFound();

                const possiblePaths = [
                    path.join(publicDir, `${requestPath}.html`),
                    path.join(publicDir, requestPath, 'index.html')
                ];

                for (const filePath of possiblePaths) {
                    if (fs.existsSync(filePath)) {
                        const fileContent = fs.readFileSync(filePath, 'utf-8');
                        const fileStat = fs.statSync(filePath);

                        const etag = createHash('md5').update(fileContent).digest('hex');
                        const lastModified = fileStat.mtime.toUTCString();

                        if (req.headers['if-none-match'] === etag || req.headers['if-modified-since'] === lastModified) 
                            return reply.status(304).send();
                        
                        reply.header('Cache-Control', 'public, max-age=3600');
                        reply.header('ETag', etag);
                        reply.header('Last-Modified', lastModified);

                        return reply.view({ raw: fileContent }, {});
                    }
                }

                reply.status(404).send('Page not found');
            }
            catch(e) { 
                this.logger.error(e);
                reply.status(500).send('Internal Server Error'); 
            }            
        });
    }

    registerControllers() {
        const controllers = ControllerRegistry.getControllers();
        
        controllers.forEach(([controllerClass, metadata]) => {
            const instance = new controllerClass();
            const prefix = metadata.prefix;
            const routes = metadata.routes;

            routes.forEach(route => {
                const fullPath = prefix + route.path;
                this.server[route.method](fullPath, (req, res) => instance[route.handlerName](req, res));
            });
        });
    }

    public listen(bind: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const [host, port] = bind.split(':');

            this.server.listen({
                port: parseInt(port, 10),
                host: host
            }, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}
