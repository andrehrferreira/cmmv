import * as fs from 'fs';
import * as path from 'path';

import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from 'cors';
import helmet from "helmet";

import { AbstractHttpAdapter, IHTTPSettings } from "@cmmv/core";

export class ExpressAdapter implements AbstractHttpAdapter {
    private server: any;

    constructor(settings: IHTTPSettings) {
        const publicDir = path.join(process.cwd(), 'public');

        this.server = express(); 
        this.server.disable('x-powered-by');
        this.server.use(express.static(publicDir));
        this.server.set('views', publicDir);
        this.server.set('view engine', 'html');
        this.server.engine('html', require("@cmmv/view"));
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
    }

    setMiddleware(){
        this.server.get('*', (req, res, next) => {
            const publicDir = path.join(process.cwd(), 'public');
            const requestPath = req.path === '/' ? 'index' : req.path.substring(1);

            const ext = path.extname(req.path);

            if (ext || ext !== "html")
                return next();
        
            const possiblePaths = [
                path.join(publicDir, `${requestPath}.html`),
                path.join(publicDir, requestPath, 'index.html')
            ];
        
            let fileFound = false;

            for (const filePath of possiblePaths) {
                if (fs.existsSync(filePath)) {
                    fileFound = true;
                    return res.render(filePath, {});
                }
            }
        
            if (!fileFound) 
                res.status(404).send('Page not found');            
        });
    }

    listen(bind: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const [host, port] = bind.split(':');

            this.server.listen(parseInt(port, 10), host, (err?: any) => {
                if (err) 
                    return reject(err);
                
                resolve();
            });
        });
    }
}