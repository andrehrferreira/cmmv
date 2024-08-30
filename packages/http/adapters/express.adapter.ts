import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import * as https from 'https';
import { Duplex } from 'stream';

import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from 'cors';
import helmet from "helmet";

import { AbstractHttpAdapter, IHTTPSettings } from "@cmmv/core";

export class ExpressAdapter implements AbstractHttpAdapter {
    private httpServer: http.Server | https.Server;
    private server: any;
    private readonly openConnections = new Set<Duplex>();

    constructor(settings: IHTTPSettings) {        
        const publicDir = path.join(process.cwd(), 'public');

        this.server = express(); 
        this.server.disable('x-powered-by');
        this.server.use(express.static(publicDir));
        this.server.set('views', publicDir);
        this.server.set('view engine', 'html');
        this.server.engine('html', require("@cmmv/view").render);
        this.server.use(express.json());
        this.server.use(bodyParser.json({limit: "50mb"}));
        this.server.use(bodyParser.urlencoded({
            limit: "50mb", 
            extended: true
        }));
        this.server.use(compression());
        this.server.use(cors());
        this.server.use(helmet({
            contentSecurityPolicy: true
        }));

        this.setMiddleware();
        this.initHttpServer(settings);        
    }

    public initHttpServer(options: any) {
        const isHttpsEnabled = options && options.httpsOptions;

        if (isHttpsEnabled) {
            this.httpServer = https.createServer(
                options.httpsOptions,
                this.server,
            );
        } 
        else {
            this.httpServer = http.createServer(this.server);
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

    public getHttpServer() {
        return this.httpServer;
    }

    public setHttpServer(httpServer) {
        this.httpServer = httpServer;
    }

    public use(middlaware: any){
        this.server.use(middlaware);
    }

    private setMiddleware(){
        this.server.all('*', (req, res, next) => {
            console.log(req.path);
            const publicDir = path.join(process.cwd(), 'public');
            const requestPath = req.path === '/' ? 'index' : req.path.substring(1);
            
            const ext = path.extname(req.path);

            if (ext || ext !== ".html")
                return next();
        
            const possiblePaths = [
                path.join(publicDir, `${requestPath}.html`),
                path.join(publicDir, requestPath, 'index.html')
            ];

            console.log(possiblePaths);
        
            let fileFound = false;

            for (const filePath of possiblePaths) {
                if (fs.existsSync(filePath)) {
                    console.log(filePath);
                    console.log("aki")
                    fileFound = true;
                    return res.render(filePath, { 
                        debug: process.env.NODE_ENV === "dev" ? require("@cmmv/view/debug.html") : ""
                    });
                }
            }
        
            if (!fileFound) 
                res.status(404).send('Page not found');            
        });
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
        return this.server.enabled;
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