/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import * as fastJson from 'fast-json-stringify';
import { ObjectId } from 'mongodb';

import { Expose, instanceToPlain, plainToClass } from 'class-transformer';

import { IsString, MinLength, MaxLength } from 'class-validator';

export interface IRoles {
    _id?: ObjectId;
    name: string;
}

//Model
export class Roles implements IRoles {
    @Expose()
    _id?: ObjectId;

    @Expose({ toClassOnly: true })
    id: string;

    @Expose()
    @IsString({ message: 'Invalid name' })
    @MinLength(3, { message: 'Invalid name' })
    @MaxLength(40, { message: 'Invalid name' })
    name: string;

    constructor(partial: Partial<Roles>) {
        Object.assign(this, partial);
    }

    public serialize() {
        return instanceToPlain(this);
    }

    public static toClass(partial: Partial<Roles>): Roles {
        return plainToClass(Roles, partial, {
            exposeUnsetFields: false,
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }

    public toString() {
        return RolesFastSchema(this);
    }
}

// Schema for fast-json-stringify
export const RolesFastSchemaStructure = {
    title: 'Roles Schema',
    type: 'object',
    properties: {
        name: {
            type: 'string',
            nullable: false,
        },
    },
    required: ['name'],
};

export const RolesFastSchema = fastJson(RolesFastSchemaStructure);
