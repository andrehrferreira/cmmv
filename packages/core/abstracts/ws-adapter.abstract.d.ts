import { Application } from '../lib/application';
import { AbstractHttpAdapter } from './http-adapter.abstract';
export declare abstract class AbstractWSAdapter {
    readonly httpServer: any;
    constructor(appOrHttpServer: any);
    abstract create(server: AbstractHttpAdapter, application: Application, options?: any): any;
    abstract bindClientConnect(server: any, callback: Function): any;
    abstract bindCustomMessageHandler(server: any, callback: Function): any;
}
