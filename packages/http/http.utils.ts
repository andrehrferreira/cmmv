import * as crypto from 'node:crypto';

export function generateFingerprint(req, usernameHashed: string) {
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.ip || req.connection.remoteAddress || '';
    const accept = req.headers['accept'] || '';
    const language = req.headers['accept-language'] || '';
    const referer = req.headers['referer'] || '';

    const rawFingerprint = `${userAgent}|${ip}|${accept}|${language}|${referer}|${usernameHashed}`;
    return crypto.createHash('sha256').update(rawFingerprint).digest('hex');
}
