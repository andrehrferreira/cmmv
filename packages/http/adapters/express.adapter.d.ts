import * as http from 'http';
import * as https from 'https';
import { Duplex } from 'stream';
import * as express from 'express';
import { AbstractHttpAdapter, IHTTPSettings, Application } from '@cmmv/core';
import { CMMVRenderer } from '@cmmv/view';
export interface ExpressRequest extends express.Request {
    requestId?: string;
}
export declare class ExpressAdapter extends AbstractHttpAdapter<http.Server | https.Server> {
    protected instance?: any;
    private logger;
    protected readonly openConnections: Set<Duplex>;
    protected render: CMMVRenderer;
    constructor(instance?: any);
    init(application: Application, settings?: IHTTPSettings): Promise<void>;
    initHttpServer(options: any): void;
    private trackOpenConnections;
    private closeOpenConnections;
    private setMiddleware;
    private registerControllers;
    private buildRouteArgs;
    listen(bind: string): Promise<void>;
    connected(): any;
    close(): Promise<unknown>;
}
