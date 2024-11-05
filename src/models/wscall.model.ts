// Generated automatically by CMMV

import * as fastJson from 'fast-json-stringify';
import { Expose, Transform } from 'class-transformer';

export interface IWsCall {
    _id?: any;
    contract: number;
    message: number;
    data: Uint8Array;
}

export class WsCall implements IWsCall {
    @Transform(({ value }) => (value !== undefined ? value : null), {
        toClassOnly: true,
    })
    _id?: any;

    @Expose()
    contract: number;

    @Expose()
    message: number;

    @Expose()
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
