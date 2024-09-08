// Generated automatically by CMMV

import { Exclude, Transform } from 'class-transformer';
import { IsString, IsHash } from 'class-validator';
import * as crypto from 'crypto';

export interface IUser {
    id?: any;
    name: string;
    username: string;
    password: string;
}

export class User implements IUser {
    id?: any;

    @IsString({ message: 'Invalid name' })
    name: string;

    @IsString({ message: 'Invalid username' })
    username: string;

    @Exclude({ toClassOnly: true })
    @Transform(
        ({ value }) => crypto.createHash('sha256').update(value).digest('hex'),
        { toClassOnly: true },
    )
    @IsHash('sha256', { message: 'Invalid password format' })
    password: string;
}
