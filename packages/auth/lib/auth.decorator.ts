import * as jwt from 'jsonwebtoken';

import { Config, Logger } from '@cmmv/core';
import { generateFingerprint } from '@cmmv/http';

import { IAuthSettings } from './auth.interface';

export function Auth(
    rolesOrSettings?: string[] | string | IAuthSettings,
): MethodDecorator {
    return (target, propertyKey: string | symbol, descriptor: any) => {
        const middleware = async (request: any, response: any, next?: any) => {
            const logger = new Logger('Auth');

            const cookieName = Config.get(
                'server.session.options.sessionCookieName',
                'token',
            );
            const sessionEnabled = Config.get<boolean>(
                'server.session.enabled',
                true,
            );
            const logging = Config.get<string>('server.logging', 'all');

            let sessionId = request.req.cookies
                ? request.req.cookies[cookieName]
                : null;

            let token = null;

            if (sessionEnabled && request.session) {
                const session = await request.session.get(sessionId);

                if (session) token = session.user.token;
            }

            if (!token) {
                token =
                    request.req.headers.authorization?.split(' ')[1] || null;
            }

            if (!token) {
                if (
                    logging === 'all' ||
                    logging === 'error' ||
                    logging === 'warning'
                )
                    logger.warning(
                        `${request.method.toUpperCase()} ${request.path} (0ms) 401 - ${request.req.socket.remoteAddress}`,
                    );

                return response.code(401).end('Unauthorized');
            }

            jwt.verify(
                token,
                Config.get('auth.jwtSecret'),
                (err: any, decoded: any) => {
                    if (err) {
                        if (
                            logging === 'all' ||
                            logging === 'error' ||
                            logging === 'warning'
                        )
                            logger.warning(
                                `${request.method.toUpperCase()} ${request.path} (0ms) 401 - ${request.req.socket.remoteAddress}`,
                            );

                        return response.code(401).end('Unauthorized');
                    }

                    if (decoded.root !== true) {
                        if (
                            (rolesOrSettings &&
                                Array.isArray(rolesOrSettings) &&
                                (!decoded.roles ||
                                    !rolesOrSettings.some(role =>
                                        decoded?.roles.includes(role),
                                    ))) ||
                            (typeof rolesOrSettings == 'string' &&
                                !decoded?.roles.includes(rolesOrSettings))
                        ) {
                            if (
                                logging === 'all' ||
                                logging === 'error' ||
                                logging === 'warning'
                            )
                                logger.warning(
                                    `${request.method.toUpperCase()} ${request.path} (0ms) 401 - ${request.req.socket.remoteAddress}`,
                                );

                            return response.code(401).end('Unauthorized');
                        } else if (rolesOrSettings) {
                            try {
                                const settings =
                                    rolesOrSettings as IAuthSettings;

                                if (
                                    settings.roles &&
                                    Array.isArray(settings.roles)
                                ) {
                                    if (
                                        !decoded.roles ||
                                        !settings.roles.some(role =>
                                            decoded.roles.includes(role),
                                        )
                                    ) {
                                        if (
                                            logging === 'all' ||
                                            logging === 'error' ||
                                            logging === 'warning'
                                        )
                                            logger.warning(
                                                `${request.method.toUpperCase()} ${request.path} (0ms) 401 - ${request.req.socket.remoteAddress}`,
                                            );

                                        return response
                                            .code(401)
                                            .end('Unauthorized');
                                    }
                                }
                            } catch {
                                return response.code(401).end('Unauthorized');
                            }
                        }
                    }

                    if (
                        decoded.fingerprint !== generateFingerprint(request.req)
                    ) {
                        logger.warning(
                            `${request.method.toUpperCase()} ${request.path} (0ms) 403 - ${request.req.socket.remoteAddress}`,
                        );

                        return response.code(403).end('Forbidden');
                    }

                    request.user = decoded;
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
