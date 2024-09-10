// Generated automatically by CMMV

import { Transform } from 'class-transformer';
import { IsString, Min, Max } from 'class-validator';
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

    @IsString({ message: 'Invalid username' })
    @Min(5, { message: 'Invalid username' })
    @Max(30, { message: 'Invalid username' })
    username: string;

    @Transform(({ value }) =>
        crypto.createHash('sha256').update(value).digest('hex'),
    )
    @IsString({ message: 'Invalid password' })
    password: string;

    googleId: string;

    @Transform(({ value }) => JSON.stringify(value))
    groups: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
