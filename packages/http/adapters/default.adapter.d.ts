import * as http from 'node:http';
import * as https from 'node:https';
import { Duplex } from 'node:stream';
import { AbstractHttpAdapter, IHTTPSettings, Application } from '@cmmv/core';
import { CMMVRenderer } from '@cmmv/view';
export declare class DefaultAdapter extends AbstractHttpAdapter<http.Server | https.Server> {
    protected instance?: any;
    private logger;
    protected readonly openConnections: Set<Duplex>;
    protected render: CMMVRenderer;
    protected vite: any;
    constructor(instance?: any);
    init(application: Application, settings?: IHTTPSettings): Promise<void>;
    initHttpServer(options: any): void;
    private trackOpenConnections;
    private closeOpenConnections;
    private setMiddleware;
    private setVite;
    private registerControllers;
    private buildRouteArgs;
    listen(bind: string): Promise<void>;
    connected(): any;
    close(): Promise<unknown>;
}
