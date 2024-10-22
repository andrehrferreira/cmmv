// Generated automatically by CMMV

import * as fastJson from 'fast-json-stringify';
import { Transform } from 'class-transformer';
import { IsString, MinLength, MaxLength } from 'class-validator';
import * as crypto from 'crypto';

export interface IUser {
    id?: any;
    username: string;
    password: string;
    googleId: string;
    groups: string;
}

export class User implements IUser {
    id?: any;

    @Transform(({ value }) =>
        crypto.createHash('sha1').update(value).digest('hex'),
    )
    @IsString({ message: 'Invalid username' })
    @MinLength(4, { message: 'Invalid username' })
    @MaxLength(40, { message: 'Invalid username' })
    username: string;

    @Transform(({ value }) =>
        crypto.createHash('sha256').update(value).digest('hex'),
    )
    @IsString({ message: 'Invalid password' })
    password: string;

    googleId: string;

    @Transform(({ value }) => JSON.stringify(value))
    groups: string = '[]';

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}

// Schema for fast-json-stringify
export const UserSchema = fastJson({
    title: 'User Schema',
    type: 'object',
    properties: {
        username: { type: 'string' },
        password: { type: 'string' },
        googleId: { type: 'string' },
        groups: { type: 'string', default: '[]' },
    },
    required: [],
});
