"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthContract = void 0;
const tslib_1 = require("tslib");
const crypto = require("crypto");
const core_1 = require("@cmmv/core");
let AuthContract = class AuthContract extends core_1.AbstractContract {
    customProto() {
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
    customTypes() {
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
};
exports.AuthContract = AuthContract;
tslib_1.__decorate([
    (0, core_1.ContractField)({
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
        transform: ({ value }) => crypto.createHash('sha1').update(value).digest('hex'),
    }),
    tslib_1.__metadata("design:type", String)
], AuthContract.prototype, "username", void 0);
tslib_1.__decorate([
    (0, core_1.ContractField)({
        protoType: 'string',
        validations: [
            {
                type: 'IsString',
                message: 'Invalid password',
            },
        ],
        transform: ({ value }) => crypto.createHash('sha256').update(value).digest('hex'),
    }),
    tslib_1.__metadata("design:type", String)
], AuthContract.prototype, "password", void 0);
tslib_1.__decorate([
    (0, core_1.ContractField)({
        protoType: 'string',
        index: true,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], AuthContract.prototype, "googleId", void 0);
tslib_1.__decorate([
    (0, core_1.ContractField)({
        protoType: 'string',
        defaultValue: '[]',
        transform: ({ value }) => JSON.stringify(value),
    }),
    tslib_1.__metadata("design:type", String)
], AuthContract.prototype, "groups", void 0);
exports.AuthContract = AuthContract = tslib_1.__decorate([
    (0, core_1.Contract)({
        controllerName: 'User',
        protoPath: 'src/protos/auth.proto',
        protoPackage: 'auth',
        directMessage: true,
        generateController: false,
        imports: ['crypto'],
    })
], AuthContract);
