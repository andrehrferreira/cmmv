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

import { IsString, IsNotEmpty } from 'class-validator';

import { I18nCoinsEntity } from './i18ncoins.entity';

export interface II18nCountries {
    _id?: ObjectId;
    code: string;
    name: string;
    currency: object;
}

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
    currency: object;

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
export const I18nCountriesFastSchema = fastJson({
    title: 'I18nCountries Schema',
    type: 'object',
    properties: {
        code: { type: 'string' },
        name: { type: 'string' },
        currency: { type: 'object' },
    },
    required: [],
});
