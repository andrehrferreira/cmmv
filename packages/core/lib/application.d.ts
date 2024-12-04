import { IHTTPSettings } from '../interfaces';
import { ITranspile, Module } from '.';
import { AbstractHttpAdapter, AbstractWSAdapter } from '../abstracts';
export interface IApplicationSettings {
    wsAdapter?: new (appOrHttpServer: any) => AbstractWSAdapter;
    httpAdapter?: new (instance?: any) => AbstractHttpAdapter;
    httpOptions?: IHTTPSettings;
    httpMiddlewares?: Array<any>;
    transpilers?: Array<new () => ITranspile>;
    modules?: Array<Module>;
    contracts?: Array<new () => any>;
    services?: Array<any>;
}
export declare class Application {
    private logger;
    static appModule: {
        controllers: any[];
        providers: any[];
        httpMiddlewares: any[];
        httpInterceptors: any[];
        httpAfterRender: any[];
    };
    private httpAdapter;
    private httpBind;
    private httpOptions;
    private wsAdapter;
    private wsServer;
    wSConnections: Map<string, any>;
    private modules;
    private transpilers;
    private controllers;
    private submodules;
    private contracts;
    private configs;
    providersMap: Map<string, any>;
    private host;
    private port;
    constructor(settings: IApplicationSettings);
    private initialize;
    private createScriptBundle;
    private createCSSBundle;
    private loadModules;
    private processContracts;
    getHttpAdapter(): AbstractHttpAdapter;
    getUnderlyingHttpServer(): void;
    getWSServer(): AbstractWSAdapter;
    static create(settings: IApplicationSettings): Application;
    private static generateModule;
    static setHTTPMiddleware(cb: Function): void;
    static setHTTPInterceptor(cb: Function): void;
    static setHTTPAfterRender(cb: Function): void;
}
