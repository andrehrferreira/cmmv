import * as fs from 'fs';
import * as path from 'path';
import * as fg from 'fast-glob';
import { v4 as uuidv4 } from 'uuid';

import { AbstractHttpAdapter, AbstractWSAdapter, IHTTPSettings } from "./interfaces";
import { ITranspile, Logger, Scope, Transpile } from './utils';
import { AbstractContract } from "./abstracts";
import { Module } from "./module";

import { 
    CONTROLLER_NAME_METADATA, DATABASE_TYPE_METADATA, 
    FIELD_METADATA, PROTO_PATH_METADATA, DIRECTMESSAGE_METADATA,
    PROTO_PACKAGE_METADATA 
} from "./decorators";

export interface IApplicationSettings {
    wsAdapter: new (appOrHttpServer: any) => AbstractWSAdapter,
    httpAdapter: new (settings: IHTTPSettings) => AbstractHttpAdapter,
    httpBind: string,
    httpOptions?: IHTTPSettings;
    transpilers?: Array<new () => ITranspile>;
    modules?: Array<Module>;
    contracts?: Array<new () => AbstractContract>;
}

export class Application {
    private logger: Logger = new Logger('Application');

    private httpAdapter: AbstractHttpAdapter;
    private httpBind: string;
    private httpOptions: IHTTPSettings;
    private wsAdapter: AbstractWSAdapter;
    private wsServer: any;
    private wSConnections: Map<string, any> = new Map<string, any>();
    private modules: Array<Module>;
    private transpilers: Array<new () => ITranspile>;
    private controllers: Array<any> = [];
    private submodules: Array<Module> = [];
    private contracts: Array<AbstractContract>;

    private constructor(settings: IApplicationSettings) {
        this.httpOptions = settings.httpOptions || {};
        this.httpAdapter = new settings.httpAdapter(this.httpOptions);
        this.wsAdapter = new settings.wsAdapter(this.httpAdapter);
        this.httpBind = settings.httpBind;
        this.transpilers = settings.transpilers || [];
        this.modules = settings.modules || [];
        this.contracts = settings.contracts?.map(contractClass => new contractClass()) || [];
        this.initialize();
    }

    private async initialize(): Promise<void> {
        try {
            this.loadModules(this.modules);
            this.processContracts();
            
            if (this.transpilers.length > 0) {
                const transpile = new Transpile(this.transpilers);
                await transpile.transpile();
                this.logger.log("All transpilers executed successfully.");
            } 
            else {
                this.logger.log("No transpilers provided.");
            }

            this.createScriptBundle();
            this.wsServer = this.wsAdapter.create(this.httpAdapter);

            this.wsAdapter.bindClientConnect(this.wsServer, (socket) => {                
                const id = uuidv4();
                socket.id = id;
                this.wSConnections.set(id, socket);
                this.logger.log(`WS Connection: ${id}`);
    
                //if(interceptor && typeof interceptor === "function")
                //    socket.on("message", (data) => interceptor(this.getHttpAdapter(), socket, data));
                    
                socket.on("error", () => this.wSConnections.delete(id));
                socket.on("close", () => this.wSConnections.delete(id));
                //socket.send(stringToArrayBuffer(id), { binary: true });
            });

            await this.httpAdapter.listen(this.httpBind).then(() => {
                this.logger.log(`Server HTTP successfully started on ${this.httpBind}`);
            }).catch((error) => {
                this.logger.error(`Failed to start HTTP server on ${this.httpBind}: ${error.message || error}`);
            });
        } 
        catch (error) {
            console.log(error);
            this.logger.error(`Failed to initialize application: ${error.message || error}`);
        }
    }

    private async createScriptBundle(){ 
        let finalbundle = path.resolve("./public/assets/bundle.min.js");
        const files = await fg(path.resolve("./public/core/*.min.js"), { ignore: ["node_modules/**"] });

        const lines: string[] = [];
        lines.push('// Generated automatically by CMMV');

        files.forEach((file) => {
            lines.push(fs.readFileSync(file, "utf-8"));
            lines.push('');
        })
        
        fs.writeFileSync(finalbundle, lines.join('\n'), { encoding: "utf-8" });
    }

    private loadModules(modules: Array<Module>): void {
        modules.forEach(module => {
            this.transpilers.push(...module.getTranspilers());
            this.controllers.push(...module.getControllers());
            this.submodules.push(...module.getSubmodules());
            this.contracts.push(...module.getContracts());

            if (module.getSubmodules().length > 0) 
                this.loadModules(module.getSubmodules());            
        });
    }

    private processContracts(): void {
        this.contracts.forEach(contract => {
            const controllerName = Reflect.getMetadata(CONTROLLER_NAME_METADATA, contract.constructor);
            const protoPath = Reflect.getMetadata(PROTO_PATH_METADATA, contract.constructor);
            const protoPackage = Reflect.getMetadata(PROTO_PACKAGE_METADATA, contract.constructor);
            const databaseType = Reflect.getMetadata(DATABASE_TYPE_METADATA, contract.constructor);
            const fields = Reflect.getMetadata(FIELD_METADATA, contract.constructor.prototype);
            const directMessage = Reflect.getMetadata(DIRECTMESSAGE_METADATA, contract.constructor);

            const contractStructure = {
                controllerName,
                protoPath,
                protoPackage,
                databaseType,
                fields,
                directMessage
            };

            Scope.addToArray("__contracts", contractStructure);
        });
    }

    public getHttpAdapter(): AbstractHttpAdapter {
        return this.httpAdapter as AbstractHttpAdapter;
    }

    public getUnderlyingHttpServer() {
        this.httpAdapter.getHttpServer();
    }

    public static create(settings: IApplicationSettings): Application {
        return new Application(settings);
    }
}
