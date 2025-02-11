import { AbstractContract, Contract, ContractField } from '@cmmv/core';

import { I18nCoinsContract } from './coins.contract';

@Contract({
    controllerName: 'I18nCountries',
    controllerCustomPath: '/i18n/countries',
    subPath: '/i18n',
    protoPackage: 'i18n',
    auth: true,
    options: {
        databaseSchemaName: 'i18n_countries',
        databaseTimestamps: true,
        databaseUserAction: true,
    },
    cache: {
        key: 'country:',
        ttl: 600,
        compress: true,
    },
})
export class I18nCountryContract extends AbstractContract {
    @ContractField({
        protoType: 'string',
        unique: true,
        validations: [
            { type: 'IsString', message: 'Invalid country code' },
            { type: 'IsNotEmpty', message: 'Country code is required' },
        ],
    })
    code: string;

    @ContractField({
        protoType: 'string',
        validations: [
            { type: 'IsString', message: 'Invalid country name' },
            { type: 'IsNotEmpty', message: 'Country name is required' },
        ],
    })
    name: string;

    @ContractField({
        protoType: 'string',
        objectType: 'string',
        entityType: 'I18nCoinsEntity',
        entityNullable: true,
        nullable: true,
        validations: [
            {
                type: 'IsString',
                message: 'Invalid currency code',
            },
        ],
        link: [
            {
                contract: I18nCoinsContract,
                entityName: 'coins',
                field: '_id',
            },
        ],
    })
    currency: string;
}
