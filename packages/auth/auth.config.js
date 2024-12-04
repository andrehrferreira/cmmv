"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthConfig = void 0;
exports.AuthConfig = {
    auth: {
        localRegister: {
            required: true,
            type: 'boolean',
            default: true,
        },
        localLogin: {
            required: true,
            type: 'boolean',
            default: true,
        },
        jwtSecret: {
            required: true,
            type: 'string',
            default: 'secret',
        },
        expiresIn: {
            required: true,
            type: 'number',
            default: 3600,
        },
        google: {
            required: false,
            type: 'object',
            default: {},
            properties: {
                clientID: {
                    required: false,
                    type: 'string',
                    default: '',
                },
                clientSecret: {
                    required: false,
                    type: 'string',
                    default: '',
                },
                callbackURL: {
                    required: false,
                    type: 'string',
                    default: 'http://localhost:3000/auth/google/callback',
                },
            },
        },
    },
    server: {
        session: {
            default: {},
            required: false,
            type: 'object',
            properties: {
                options: {
                    default: {},
                    required: false,
                    type: 'object',
                    properties: {
                        sessionCookieName: {
                            default: 'cmmv-session',
                            required: false,
                            type: 'string',
                        },
                    },
                },
            },
        },
    },
};
