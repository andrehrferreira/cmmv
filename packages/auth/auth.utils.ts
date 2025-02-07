import * as jwt from 'jsonwebtoken';
import { Config } from '@cmmv/core';

import { IJWTDecoded } from './auth.interface';

export async function jwtVerify(token: string): Promise<IJWTDecoded> {
    try {
        return await new Promise<IJWTDecoded>((resolve, reject) => {
            jwt.verify(
                token.replace('Bearer ', ''),
                Config.get('auth.jwtSecret'),
                (err: any, decoded: IJWTDecoded) => {
                    if (err) reject(err);
                    else resolve(decoded);
                },
            );
        });
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}
