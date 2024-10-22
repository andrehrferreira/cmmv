// Generated automatically by CMMV

import * as fastJson from 'fast-json-stringify';

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
