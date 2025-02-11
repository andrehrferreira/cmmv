import { promisify } from 'util';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

import { Config } from '@cmmv/core';

import { IJWTDecoded } from './auth.interface';

export async function jwtVerify(token: string): Promise<IJWTDecoded> {
    const jwtSecret = Config.get<string>('auth.jwtSecret');

    if (!jwtSecret) throw new Error('JWT secret is not configured');

    try {
        const decoded = await promisify(jwt.verify)(
            token.replace('Bearer ', ''),
            jwtSecret,
        );
        return decoded as IJWTDecoded;
    } catch {
        throw new Error('Invalid or expired token');
    }
}

export function generateFingerprint(req, usernameHashed) {
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.ip || req.connection.remoteAddress || '';
    const accept = req.headers['accept'] || '';
    const language = req.headers['accept-language'] || '';
    const referer = req.headers['referer'] || '';
    const rawFingerprint = `${userAgent}|${ip}|${accept}|${language}|${referer}|${usernameHashed}`;
    return crypto.createHash('sha256').update(rawFingerprint).digest('hex');
}
