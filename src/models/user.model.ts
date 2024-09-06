// Generated automatically by CMMV

import { Exclude, Transform } from 'class-transformer';
import * as crypto from 'crypto';

export interface IUser {
    id?: any;
    name: string;
    username: string;
    password: string;
}

export class User implements IUser {
    id?: any;

    name: string;

    username: string;

    @Exclude({ toClassOnly: true })
    @Transform(
        ({ value }) => crypto.createHash('sha256').update(value).digest('hex'),
        { toClassOnly: true },
    )
    password: string;
}
