import * as crypto from 'crypto';
import { AbstractContract, Contract, ContractField } from '@cmmv/core';

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
        defaultValue: '[]',
        transform: ({ value }) => JSON.stringify(value),
    })
    groups: string;

    customProto(): string {
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
    }
}
