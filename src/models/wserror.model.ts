/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import * as fastJson from 'fast-json-stringify';

import { Expose, instanceToPlain, plainToClass } from 'class-transformer';

export interface IWsError {
    message: string;
    code: number;
    context: string;
}

//Model
export class WsError implements IWsError {
    @Expose({ toClassOnly: true })
    id: string;

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

    public static toClass(partial: Partial<WsError>): WsError {
        return plainToClass(WsError, partial, {
            exposeUnsetFields: false,
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }

    public toString() {
        return WsErrorFastSchema(this);
    }
}

// Schema for fast-json-stringify
export const WsErrorFastSchemaStructure = {
    title: 'WsError Schema',
    type: 'object',
    properties: {
        message: {
            type: 'string',
            nullable: false,
        },
        code: {
            type: 'integer',
            nullable: false,
        },
        context: {
            type: 'string',
            nullable: false,
        },
    },
    required: ['message', 'code', 'context'],
};

export const WsErrorFastSchema = fastJson(WsErrorFastSchemaStructure);
