import { AbstractContract, Contract, ContractField } from '@cmmv/core';

import { RolesContract } from './roles.contract';

@Contract({
    controllerName: 'Groups',
    protoPackage: 'auth',
    subPath: '/auth',
    generateController: true,
    auth: true,
    options: {
        databaseSchemaName: 'auth_groups',
        databaseTimestamps: true,
        databaseUserAction: true,
    },
})
export class GroupsContract extends AbstractContract {
    @ContractField({
        protoType: 'string',
        unique: true,
        nullable: false,
        validations: [
            {
                type: 'IsString',
                message: 'Invalid name',
            },
            {
                type: 'MinLength',
                value: 3,
                message: 'Invalid name',
            },
            {
                type: 'MaxLength',
                value: 40,
                message: 'Invalid name',
            },
        ],
    })
    name: string;

    @ContractField({
        protoType: 'Roles',
        defaultValue: 'null',
        objectType: 'object',
        entityType: 'RolesEntity',
        protoRepeated: true,
        nullable: true,
        link: [
            {
                contract: RolesContract,
                entityName: 'roles',
                field: '_id',
                array: true,
            },
        ],
    })
    roles: Array<any>;
}
