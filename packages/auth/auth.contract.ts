import * as crypto from 'crypto';
import {
    AbstractContract,
    Contract,
    ContractField,
    ContractMessage,
    ContractService,
} from '@cmmv/core';

@Contract({
    controllerName: 'User',
    protoPath: 'src/protos/auth.proto',
    protoPackage: 'auth',
    directMessage: true,
    generateController: false,
    imports: ['crypto'],
})
export class AuthContract extends AbstractContract {
    @ContractField({
        protoType: 'string',
        index: true,
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
    googleId?: string;

    @ContractField({
        protoType: 'string',
        defaultValue: '"[]"',
        objectType: 'string',
        transform: ({ value }) => JSON.stringify(value),
        toPlain: ({ value }) => (value ? JSON.parse(value) : []),
    })
    groups: Array<string>;

    @ContractField({
        protoType: 'string',
        defaultValue: '"[]"',
        objectType: 'string',
        transform: ({ value }) => JSON.stringify(value),
        toPlain: ({ value }) => (value ? JSON.parse(value) : []),
    })
    roles: Array<string>;

    @ContractField({
        protoType: 'bool',
        defaultValue: false,
    })
    root: boolean;

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
        createBoilerplate: true,
        functionBoilerplate: 'LoginParser',
        auth: false,
        functionName: 'Login',
        request: 'LoginRequest',
        response: 'LoginResponse',
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
        createBoilerplate: true,
        functionBoilerplate: 'RegisterParser',
        auth: false,
        functionName: 'Register',
        request: 'RegisterRequest',
        response: 'RegisterResponse',
    })
    Register: Function;

    /*customProto(): string {
        return `
message LoginRequest {
    string username = 1;
    string password = 2;
}

message LoginResponse {
    bool success = 1;
    string token = 2;
    string message = 3;
}

message RegisterRequest {
    string username = 1;
    string email = 2;
    string password = 3;
}

message RegisterResponse {
    bool success = 1;
    string message = 3;
}
          
service AuthService {
    rpc Login (LoginRequest) returns (LoginResponse);
    rpc Register (RegisterRequest) returns (RegisterResponse);
}`;
    }

    customTypes(): string {
        return `
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    token: string;
    message: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
}`;
    }*/
}
