// Generated automatically by CMMV

export interface IWsCall {
    id?: any;
    contract: number;
    message: number;
    data: string;
}

export class WsCall implements IWsCall {
    id?: any;

    contract: number;

    message: number;

    data: string;

    constructor(partial: Partial<WsCall>) {
        Object.assign(this, partial);
    }
}
