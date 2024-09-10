// Generated automatically by CMMV

export interface IWsError {
    id?: any;
    message: string;
    code: number;
    context: string;
}

export class WsError implements IWsError {
    id?: any;

    message: string;

    code: number;

    context: string;

    constructor(partial: Partial<WsError>) {
        Object.assign(this, partial);
    }
}
