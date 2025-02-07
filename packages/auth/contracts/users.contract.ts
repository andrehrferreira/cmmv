import * as crypto from 'crypto';

import {
    AbstractContract,
    Contract,
    ContractField,
    ContractMessage,
    ContractService,
} from '@cmmv/core';

import { RolesContract } from './roles.contract';
import { GroupsContract } from './groups.contract';

@Contract({
    controllerName: 'User',
    protoPackage: 'auth',
    subPath: '/auth',
    generateController: true,
    auth: true,
    imports: ['crypto'],
    index: [
        {
            name: 'idx_user_login',
            fields: ['username', 'password'],
        },
    ],
    options: {
        databaseSchemaName: 'auth_users',
        databaseTimestamps: true,
    },
})
export class UserContract extends AbstractContract {
    @ContractField({
        protoType: 'string',
        unique: true,
        validations: [
            {
                type: 'IsString',
                message: 'Invalid username',
            },
            {
                type: 'MinLength',
                value: 4,
                message: 'Invalid username',
            },
            {
                type: 'MaxLength',
                value: 40,
                message: 'Invalid username',
            },
        ],
        transform: ({ value }) =>
            crypto.createHash('sha1').update(value).digest('hex'),
    })
    username: string;

    @ContractField({
        protoType: 'string',
        validations: [
            {
                type: 'IsString',
                message: 'Invalid password',
            },
        ],
        transform: ({ value }) =>
            crypto.createHash('sha256').update(value).digest('hex'),
    })
    password: string;

    @ContractField({
        protoType: 'string',
        index: true,
        nullable: true,
    })
    provider?: string;

    @ContractField({
        protoType: 'string',
        objectType: 'object',
        entityType: 'GroupsEntity',
        protoRepeated: true,
        nullable: true,
        link: [
            {
                contract: GroupsContract,
                entityName: 'groups',
                field: '_id',
                array: true,
            },
        ],
    })
    groups: Array<string>;

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
    roles: Array<string>;

    @ContractField({
        protoType: 'bool',
        defaultValue: false,
    })
    root: boolean;

    @ContractField({
        protoType: 'bool',
        defaultValue: false,
    })
    blocked: boolean;

    @ContractField({
        protoType: 'bool',
        defaultValue: false,
    })
    validated: boolean;

    @ContractField({
        protoType: 'bool',
        defaultValue: false,
    })
    verifyEmail: boolean;

    @ContractField({
        protoType: 'int32',
        nullable: true,
        exclude: true,
    })
    verifyEmailCode: number;

    @ContractField({
        protoType: 'bool',
        defaultValue: false,
    })
    verifySMS: boolean;

    @ContractField({
        protoType: 'int32',
        nullable: true,
        exclude: true,
    })
    verifySMSCode: number;

    @ContractField({
        protoType: 'string',
        nullable: true,
        exclude: true,
    })
    optSecret: string;

    @ContractField({
        protoType: 'bool',
        defaultValue: false,
        exclude: true,
    })
    optSecretVerify: boolean;

    // Login
    @ContractMessage({
        name: 'LoginRequest',
        properties: {
            username: {
                type: 'string',
                required: true,
            },
            password: {
                type: 'string',
                required: true,
            },
        },
    })
    LoginRequest: {
        username: string;
        password: string;
    };

    @ContractMessage({
        name: 'LoginResponse',
        properties: {
            success: {
                type: 'bool',
                required: true,
            },
            token: {
                type: 'string',
                required: false,
            },
            message: {
                type: 'string',
                required: false,
            },
        },
    })
    LoginResponse: {
        success: boolean;
        token: string;
        message: string;
    };

    @ContractService({
        name: 'Login',
        path: 'login',
        method: 'POST',
        auth: false,
        functionName: 'login',
        request: 'LoginRequest',
        response: 'LoginResponse',
        createBoilerplate: false,
    })
    Login: Function;

    //Register
    @ContractMessage({
        name: 'RegisterRequest',
        properties: {
            username: {
                type: 'string',
                required: true,
            },
            email: {
                type: 'string',
                required: true,
            },
            password: {
                type: 'string',
                required: true,
            },
        },
    })
    RegisterRequest: {
        username: string;
        email: string;
        password: string;
    };

    @ContractMessage({
        name: 'RegisterResponse',
        properties: {
            success: {
                type: 'bool',
                required: true,
            },
            message: {
                type: 'string',
                required: false,
            },
        },
    })
    RegisterResponse: {
        success: boolean;
        message: string;
    };

    @ContractService({
        name: 'Register',
        path: 'register',
        method: 'POST',
        auth: false,
        functionName: 'register',
        request: 'RegisterRequest',
        response: 'RegisterResponse',
        createBoilerplate: false,
    })
    Register: Function;
}
