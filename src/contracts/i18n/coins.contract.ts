import { AbstractContract, Contract, ContractField } from '@cmmv/core';

@Contract({
    controllerName: 'I18nCoins',
    controllerCustomPath: '/i18n/coins',
    subPath: '/i18n',
    protoPackage: 'i18n',
    auth: true,
    options: {
        databaseSchemaName: 'i18n_coins',
        databaseTimestamps: true,
        databaseUserAction: true,
    },
    cache: {
        key: 'coins:',
        ttl: 3000,
        compress: true,
    },
})
export class I18nCoinsContract extends AbstractContract {
    @ContractField({
        protoType: 'string',
        unique: true,
        validations: [
            { type: 'IsString', message: 'Invalid currency code' },
            { type: 'IsNotEmpty', message: 'Currency code is required' },
        ],
    })
    code: string;

    @ContractField({
        protoType: 'string',
        validations: [
            { type: 'IsString', message: 'Invalid currency name' },
            { type: 'IsNotEmpty', message: 'Currency name is required' },
        ],
    })
    name: string;

    @ContractField({
        protoType: 'string',
        validations: [{ type: 'IsString', message: 'Invalid format' }],
    })
    format: string;
}
