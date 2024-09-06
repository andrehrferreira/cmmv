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
    })
    name: string;

    @ContractField({
        protoType: 'string',
        unique: true,
    })
    username: string;

    @ContractField({
        protoType: 'string',
        exclude: true,
        toClassOnly: true,
        transform: ({ value }) =>
            crypto.createHash('sha256').update(value).digest('hex'),
    })
    password: string;
}
