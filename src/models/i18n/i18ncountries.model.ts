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

import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';

import { I18nCoins, I18nCoinsFastSchemaStructure } from './i18ncoins.model';

export interface II18nCountries {
    _id?: ObjectId;
    code: string;
    name: string;
    currency: object;
}

//Model
export class I18nCountries implements II18nCountries {
    @Expose()
    _id?: ObjectId;

    @Expose({ toClassOnly: true })
    id: string;

    @Expose()
    @IsString({ message: 'Invalid country code' })
    @IsNotEmpty({ message: 'Country code is required' })
    code: string;

    @Expose()
    @IsString({ message: 'Invalid country name' })
    @IsNotEmpty({ message: 'Country name is required' })
    name: string;

    @Expose()
    @IsString({ message: 'Invalid currency code' })
    @ValidateNested()
    currency: I18nCoins;

    constructor(partial: Partial<I18nCountries>) {
        Object.assign(this, partial);
    }

    public serialize() {
        return instanceToPlain(this);
    }

    public static toClass(partial: Partial<I18nCountries>): I18nCountries {
        return plainToClass(I18nCountries, partial, {
            exposeUnsetFields: false,
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }

    public toString() {
        return I18nCountriesFastSchema(this);
    }
}

// Schema for fast-json-stringify
export const I18nCountriesFastSchemaStructure = {
    title: 'I18nCountries Schema',
    type: 'object',
    properties: {
        code: {
            type: 'string',
            nullable: false,
        },
        name: {
            type: 'string',
            nullable: false,
        },
        currency: {
            type: 'object',
            nullable: false,
        },
    },
    required: ['code', 'name', 'currency'],
};

export const I18nCountriesFastSchema = fastJson(
    I18nCountriesFastSchemaStructure,
);
