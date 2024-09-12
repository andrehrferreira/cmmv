// Generated automatically by CMMV

export interface IWsCall {
    id?: any;
    contract: number;
    message: number;
    data: Uint8Array;
}

export class WsCall implements IWsCall {
    id?: any;

    contract: number;

    message: number;

    data: Uint8Array;

    constructor(partial: Partial<WsCall>) {
        Object.assign(this, partial);
    }
}
