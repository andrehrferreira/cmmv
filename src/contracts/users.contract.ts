import * as crypto from 'crypto';

import { AbstractContract, Contract, ContractField } from '@cmmv/core';

@Contract({
    controllerName: 'User',
    protoPath: 'src/protos/user.proto',
    protoPackage: 'user',
    imports: ['crypto'],
})
export class UsersContract extends AbstractContract {
    @ContractField({
        protoType: 'string',
        validations: [
            {
                type: 'IsString',
                message: 'Invalid name',
            },
        ],
    })
    name: string;

    @ContractField({
        protoType: 'string',
        unique: true,
        validations: [
            {
                type: 'IsString',
                message: 'Invalid username',
            },
        ],
    })
    username: string;

    @ContractField({
        protoType: 'string',
        exclude: true,
        toClassOnly: true,
        transform: ({ value }) =>
            crypto.createHash('sha256').update(value).digest('hex'),
        validations: [
            {
                type: ['IsHash', 'sha256'],
                message: 'Invalid password format',
            },
        ],
    })
    password: string;
}
