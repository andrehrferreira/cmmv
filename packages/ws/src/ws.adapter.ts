import { WebSocketServer } from '../node_modules/ws';
import { AbstractHttpAdapter, AbstractWSAdapter, Application } from "@cmmv/core";

export class WSAdapter extends AbstractWSAdapter {
    create(server: AbstractHttpAdapter, options?: any) {
        return new WebSocketServer({
            server: server.getHttpServer(),
            perMessageDeflate: {
                zlibDeflateOptions: {
                    chunkSize: 1024,
                    memLevel: 7,
                    level: 3
                },
                serverMaxWindowBits: 10, 
                concurrencyLimit: 10
            },
            ...options
        });
    }

    bindClientConnect(server, callback: Function) {
        server.on('connection', callback);
    }

    bindCustomMessageHandler(server, callback: Function){
        server.on('message', callback);
    }
}