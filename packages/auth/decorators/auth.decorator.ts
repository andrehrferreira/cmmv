import * as jwt from 'jsonwebtoken';
import { Config } from '@cmmv/core';

export function Auth(roles?: string[]): MethodDecorator {
    return (target, propertyKey: string | symbol, descriptor: any) => {
        const middleware = (req: any, res: any, next?: any) => {
            const cookieName = Config.get(
                'server.session.options.sessionCookieName',
                'token',
            );
            let token = req.cookies ? req.cookies[cookieName] : null;

            if (!token)
                token = req.headers.authorization?.split(' ')[1] || null;

            if (!token) return res.status(401).send('Unauthorized');

            jwt.verify(
                token,
                Config.get('auth.jwtSecret'),
                (err: any, decoded: any) => {
                    if (err) return res.status(401).send('Unauthorized');

                    if (
                        roles &&
                        (!decoded.roles ||
                            !roles.some(role => decoded.roles.includes(role)))
                    )
                        return res.status(403).send('Forbidden');

                    req.user = decoded;
                    next();
                },
            );
        };

        const existingFields =
            Reflect.getMetadata('route_metadata', descriptor.value) || {};

        const newField = existingFields?.middleware
            ? { middleware: [...existingFields?.middleware, middleware] }
            : { middleware: [middleware] };

        Reflect.defineMetadata(
            'route_metadata',
            { ...existingFields, ...newField },
            descriptor.value,
        );
    };
}
