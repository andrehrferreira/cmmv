// Generated automatically by CMMV

import * as fastJson from 'fast-json-stringify';
import { ObjectId } from 'mongodb';
import { Expose, instanceToPlain, Transform } from 'class-transformer';
import { IsString, MinLength, MaxLength } from 'class-validator';
import * as crypto from 'crypto';

export interface IUser {
    _id?: ObjectId;
    username: string;
    password: string;
    googleId: string;
    groups: string;
    roles: string;
    root: boolean;
}

export class User implements IUser {
    @Expose()
    _id?: ObjectId;

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
    googleId: string;

    @Expose()
    @Transform(({ value }) => JSON.stringify(value), { toClassOnly: true })
    @Transform(({ value }) => (value ? JSON.parse(value) : []), {
        toPlainOnly: true,
    })
    groups: string = '[]';

    @Expose()
    @Transform(({ value }) => JSON.stringify(value), { toClassOnly: true })
    @Transform(({ value }) => (value ? JSON.parse(value) : []), {
        toPlainOnly: true,
    })
    roles: string = '[]';

    @Expose()
    root: boolean = false;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

    public serialize() {
        return instanceToPlain(this);
    }

    public toString() {
        return UserFastSchema(this);
    }
}

// Schema for fast-json-stringify
export const UserFastSchema = fastJson({
    title: 'User Schema',
    type: 'object',
    properties: {
        username: { type: 'string' },
        password: { type: 'string' },
        googleId: { type: 'string' },
        groups: { type: 'string', default: '"[]"' },
        roles: { type: 'string', default: '"[]"' },
        root: { type: 'boolean', default: false },
    },
    required: [],
});

// Messages
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
}
