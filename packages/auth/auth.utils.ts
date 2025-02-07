import * as jwt from 'jsonwebtoken';
import { Config } from '@cmmv/core';

export function jwtVerify(token: string) {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token.replace('Bearer ', ''),
            Config.get('auth.jwtSecret'),
            (err: any, decoded: any) => {
                if (err) reject(err);
                else resolve(decoded);
            },
        );
    });
}
