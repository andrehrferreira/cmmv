/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import * as fastJson from 'fast-json-stringify';
import { Expose, instanceToPlain, plainToClass } from 'class-transformer';

export interface IWsCall {
    contract: number;
    message: number;
    data: Uint8Array;
}

export class WsCall implements IWsCall {
    @Expose({ toClassOnly: true })
    id: string;

    @Expose()
    contract: number;

    @Expose()
    message: number;

    @Expose()
    data: Uint8Array;

    constructor(partial: Partial<WsCall>) {
        Object.assign(this, partial);
    }

    public serialize() {
        return instanceToPlain(this);
    }

    public static toClass(partial: Partial<WsCall>): WsCall {
        return plainToClass(WsCall, partial, {
            exposeUnsetFields: false,
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }

    public toString() {
        return WsCallFastSchema(this);
    }
}

// Schema for fast-json-stringify
export const WsCallFastSchema = fastJson({
    title: 'WsCall Schema',
    type: 'object',
    properties: {
        contract: { type: 'integer' },
        message: { type: 'integer' },
        data: { type: 'string' },
    },
    required: [],
});
