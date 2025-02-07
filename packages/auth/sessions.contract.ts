import { AbstractContract, Contract, ContractField } from '@cmmv/core';

import { UserContract } from './users.contract';

@Contract({
    controllerName: 'Sessions',
    protoPackage: 'auth',
    subPath: '/auth',
    generateController: false,
    options: {
        databaseSchemaName: 'auth_sessions',
        databaseTimestamps: true,
    },
})
export class SessionsContract extends AbstractContract {
    @ContractField({
        protoType: 'string',
        nullable: false,
        unique: true,
        index: true,
    })
    uuid: string;

    @ContractField({
        protoType: 'string',
        nullable: false,
        index: true,
    })
    fingerprint: string;

    @ContractField({
        protoType: 'string',
        objectType: 'object',
        entityType: 'UserEntity',
        protoRepeated: false,
        nullable: false,
        link: [
            {
                contract: UserContract,
                entityName: 'user',
                field: '_id',
                array: true,
            },
        ],
    })
    user: string;

    @ContractField({
        protoType: 'string',
        nullable: false,
    })
    ipAddress: string;

    @ContractField({
        protoType: 'string',
        nullable: true,
    })
    device: string;

    @ContractField({
        protoType: 'string',
        nullable: true,
    })
    browser: string;

    @ContractField({
        protoType: 'string',
        nullable: true,
    })
    os: string;

    @ContractField({
        protoType: 'bool',
        nullable: false,
        defaultValue: false,
    })
    revoked: boolean;
}
