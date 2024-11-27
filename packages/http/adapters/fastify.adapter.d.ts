import { Duplex } from 'stream';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { AbstractHttpAdapter, IHTTPSettings, Application } from '@cmmv/core';
import { CMMVRenderer } from '@cmmv/view';
export interface FastifyRequestCustom extends FastifyRequest {
    requestId?: string;
    nonce?: string;
}
export declare class FastifyAdapter extends AbstractHttpAdapter<FastifyInstance> {
    private logger;
    protected readonly openConnections: Set<Duplex>;
    protected render: CMMVRenderer;
    constructor(instance?: FastifyInstance);
    init(application: Application, settings?: IHTTPSettings): Promise<void>;
    initHttpServer(options: any): Promise<void>;
    private setMiddleware;
    private registerControllers;
    private buildRouteArgs;
    listen(bind: string): Promise<void>;
    connected(): any;
    close(): Promise<undefined>;
}
