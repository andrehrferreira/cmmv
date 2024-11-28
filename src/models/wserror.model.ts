// Generated automatically by CMMV

import * as fastJson from 'fast-json-stringify';
import { ObjectId } from 'mongodb';
import { Expose, instanceToPlain } from 'class-transformer';

export interface IWsError {
    message: string;
    code: number;
    context: string;
}

export class WsError implements IWsError {
    @Expose()
    message: string;

    @Expose()
    code: number;

    @Expose()
    context: string;

    constructor(partial: Partial<WsError>) {
        Object.assign(this, partial);
    }

    public serialize() {
        return instanceToPlain(this);
    }

    public toString() {
        return WsErrorFastSchema(this);
    }
}

// Schema for fast-json-stringify
export const WsErrorFastSchema = fastJson({
    title: 'WsError Schema',
    type: 'object',
    properties: {
        message: { type: 'string' },
        code: { type: 'integer' },
        context: { type: 'string' },
    },
    required: [],
});
