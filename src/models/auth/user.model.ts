/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import * as fastJson from 'fast-json-stringify';
import * as crypto from 'crypto';
import { ObjectId } from 'mongodb';

import {
    Expose,
    instanceToPlain,
    plainToInstance,
    Exclude,
    Transform,
} from 'class-transformer';

import {
    IsOptional,
    IsString,
    MinLength,
    MaxLength,
    ValidateNested,
} from 'class-validator';

import { Roles, RolesFastSchemaStructure } from './roles.model';

export interface IUser {
    _id?: ObjectId;
    username: string;
    password: string;
    provider?: string;
    groups?: string;
    roles?: object | string | string[] | ObjectId;
    root: boolean;
    blocked: boolean;
    validated: boolean;
    verifyEmail: boolean;
    verifyEmailCode?: number;
    verifySMS: boolean;
    verifySMSCode?: number;
    optSecret?: string;
    optSecretVerify: boolean;
}

//Model
export class User implements IUser {
    @Expose()
    @IsOptional()
    _id?: ObjectId;

    @Expose({ toClassOnly: true })
    @IsOptional()
    id: string;

    @Expose()
    @Transform(
        ({ value }) => crypto.createHash('sha1').update(value).digest('hex'),
        { toClassOnly: true },
    )
    @IsString({ message: 'Invalid username' })
    @MinLength(4, { message: 'Invalid username' })
    @MaxLength(40, { message: 'Invalid username' })
    username: string;

    @Expose()
    @Transform(
        ({ value }) => crypto.createHash('sha256').update(value).digest('hex'),
        { toClassOnly: true },
    )
    @IsString({ message: 'Invalid password' })
    password: string;

    @Expose()
    provider?: string;

    @Expose()
    @Transform(({ value }) => JSON.stringify(value), { toClassOnly: true })
    @Transform(({ value }) => (value ? JSON.parse(value) : []), {
        toPlainOnly: true,
    })
    groups?: string;

    @Expose()
    //@ValidateNested()
    roles?: Roles[] | string[] | ObjectId;

    @Expose()
    root: boolean = false;

    @Expose()
    blocked: boolean = false;

    @Expose()
    validated: boolean = false;

    @Expose()
    verifyEmail: boolean = false;

    @Expose()
    verifyEmailCode?: number;

    @Expose()
    verifySMS: boolean = false;

    @Expose()
    verifySMSCode?: number;

    @Expose()
    optSecret?: string;

    @Expose()
    optSecretVerify: boolean = false;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

    public serialize() {
        return instanceToPlain(this);
    }

    public static fromPartial(partial: Partial<User>): User {
        return plainToInstance(User, partial, {
            exposeUnsetFields: false,
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }

    public static fromEntity(entity: any): User {
        return plainToInstance(this, entity, {
            exposeUnsetFields: false,
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }

    public toString() {
        return UserFastSchema(this);
    }
}

// Schema
export const UserFastSchemaStructure = {
    title: 'User Schema',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            nullable: false,
        },
        username: {
            type: 'string',
            nullable: false,
        },
        password: {
            type: 'string',
            nullable: false,
        },
        provider: {
            type: 'string',
            nullable: true,
        },
        groups: {
            type: 'array',
            nullable: true,
            items: {
                type: 'string',
            },
        },
        roles: {
            type: 'array',
            nullable: true,
            items: RolesFastSchemaStructure,
        },
        root: {
            type: 'boolean',
            nullable: false,
            default: false,
        },
        blocked: {
            type: 'boolean',
            nullable: false,
            default: false,
        },
        validated: {
            type: 'boolean',
            nullable: false,
            default: false,
        },
        verifyEmail: {
            type: 'boolean',
            nullable: false,
            default: false,
        },
        verifyEmailCode: {
            type: 'integer',
            nullable: true,
        },
        verifySMS: {
            type: 'boolean',
            nullable: false,
            default: false,
        },
        verifySMSCode: {
            type: 'integer',
            nullable: true,
        },
        optSecret: {
            type: 'string',
            nullable: true,
        },
        optSecretVerify: {
            type: 'boolean',
            nullable: false,
            default: false,
        },
    },
    required: [
        'id',
        'username',
        'password',
        'root',
        'blocked',
        'validated',
        'verifyEmail',
        'verifySMS',
        'optSecretVerify',
    ],
};

export const UserFastSchema = fastJson(UserFastSchemaStructure);

// DTOs
export interface LoginRequest {
    username: string;
    password: string;
}

export class LoginRequestDTO implements LoginRequest {
    username: string;
    password: string;

    constructor(partial: Partial<LoginRequestDTO>) {
        Object.assign(this, partial);
    }

    public serialize() {
        return instanceToPlain(this);
    }

    public static fromPartial(
        partial: Partial<LoginRequestDTO>,
    ): LoginRequestDTO {
        return plainToInstance(LoginRequestDTO, partial, {
            exposeUnsetFields: false,
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }

    public static fromEntity(entity: any): LoginRequestDTO {
        return plainToInstance(LoginRequestDTO, entity, {
            exposeUnsetFields: false,
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }
}

export interface LoginResponse {
    success: boolean;
    token?: string;
    message?: string;
}

export class LoginResponseDTO implements LoginResponse {
    success: boolean;
    token?: string;
    message?: string;

    constructor(partial: Partial<LoginResponseDTO>) {
        Object.assign(this, partial);
    }

    public serialize() {
        return instanceToPlain(this);
    }

    public static fromPartial(
        partial: Partial<LoginResponseDTO>,
    ): LoginResponseDTO {
        return plainToInstance(LoginResponseDTO, partial, {
            exposeUnsetFields: false,
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }

    public static fromEntity(entity: any): LoginResponseDTO {
        return plainToInstance(LoginResponseDTO, entity, {
            exposeUnsetFields: false,
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export class RegisterRequestDTO implements RegisterRequest {
    username: string;
    email: string;
    password: string;

    constructor(partial: Partial<RegisterRequestDTO>) {
        Object.assign(this, partial);
    }

    public serialize() {
        return instanceToPlain(this);
    }

    public static fromPartial(
        partial: Partial<RegisterRequestDTO>,
    ): RegisterRequestDTO {
        return plainToInstance(RegisterRequestDTO, partial, {
            exposeUnsetFields: false,
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }

    public static fromEntity(entity: any): RegisterRequestDTO {
        return plainToInstance(RegisterRequestDTO, entity, {
            exposeUnsetFields: false,
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }
}

export interface RegisterResponse {
    success: boolean;
    message?: string;
}

export class RegisterResponseDTO implements RegisterResponse {
    success: boolean;
    message?: string;

    constructor(partial: Partial<RegisterResponseDTO>) {
        Object.assign(this, partial);
    }

    public serialize() {
        return instanceToPlain(this);
    }

    public static fromPartial(
        partial: Partial<RegisterResponseDTO>,
    ): RegisterResponseDTO {
        return plainToInstance(RegisterResponseDTO, partial, {
            exposeUnsetFields: false,
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }

    public static fromEntity(entity: any): RegisterResponseDTO {
        return plainToInstance(RegisterResponseDTO, entity, {
            exposeUnsetFields: false,
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }
}
