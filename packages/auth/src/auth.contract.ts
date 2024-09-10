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
        validations: [
            {
                type: 'IsString',
                message: 'Invalid username',
            },
            {
                type: 'Min',
                value: 5,
                message: 'Invalid username',
            },
            {
                type: 'Max',
                value: 30,
                message: 'Invalid username',
            },
        ],
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
    })
    googleId: string;

    @ContractField({
        protoType: 'string',
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
          
service AuthService {
    rpc Login (LoginRequest) returns (LoginResponse);
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
}`;
    }
}
