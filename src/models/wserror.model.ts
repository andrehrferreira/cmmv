// Generated automatically by CMMV

import * as fastJson from 'fast-json-stringify';
import { Expose, Transform } from 'class-transformer';

export interface IWsError {
    _id?: any;
    message: string;
    code: number;
    context: string;
}

export class WsError implements IWsError {
    @Transform(({ value }) => (value !== undefined ? value : null), {
        toClassOnly: true,
    })
    _id?: any;

    @Expose()
    message: string;

    @Expose()
    code: number;

    @Expose()
    context: string;

    constructor(partial: Partial<WsError>) {
        Object.assign(this, partial);
    }
}

// Schema for fast-json-stringify
export const WsErrorSchema = fastJson({
    title: 'WsError Schema',
    type: 'object',
    properties: {
        message: { type: 'string' },
        code: { type: 'integer' },
        context: { type: 'string' },
    },
    required: [],
});
