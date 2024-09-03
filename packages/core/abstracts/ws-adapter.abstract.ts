import { Application } from "../application";
import { AbstractHttpAdapter } from "./http-adapter.abstract";

export abstract class AbstractWSAdapter {  
    protected readonly httpServer: any;

    constructor(appOrHttpServer: any) {
        if (appOrHttpServer && appOrHttpServer instanceof Application)
            this.httpServer = appOrHttpServer.getUnderlyingHttpServer();
        else 
            this.httpServer = appOrHttpServer;
    }

    public abstract create(server: AbstractHttpAdapter, application: Application, options?: any);
    public abstract bindClientConnect(server, callback: Function): any;
    public abstract bindCustomMessageHandler(server, callback: Function): any;
}