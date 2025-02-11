import { AbstractContract, Contract, ContractField } from '@cmmv/core';

@Contract({
    controllerName: 'Roles',
    protoPackage: 'auth',
    subPath: '/auth',
    generateController: true,
    auth: true,
    options: {
        databaseSchemaName: 'auth_roles',
    },
})
export class RolesContract extends AbstractContract {
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
}
