// Generated automatically by CMMV

import * as fastJson from 'fast-json-stringify';

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

// Schema for fast-json-stringify
export const WsCallSchema = fastJson({
    title: 'WsCall Schema',
    type: 'object',
    properties: {
        contract: { type: 'integer' },
        message: { type: 'integer' },
        data: { type: 'string' },
    },
    required: [],
});
