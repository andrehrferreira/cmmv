require('dotenv').config();

import { Config } from '@cmmv/core';

Config.assign({
    env: process.env.NODE_ENV,

    server: {
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || 3000,
        poweredBy: false,
        removePolicyHeaders: false,
        compress: {
            enabled: true,
            options: {
                level: 6,
            },
        },
        cors: true,
        helmet: {
            enabled: true,
            options: {
                contentSecurityPolicy: false,
            },
        },
        session: {
            enabled: true,
            options: {
                sessionCookieName:
                    process.env.SESSION_COOKIENAME || 'cmmv-session',
                secret: process.env.SESSION_SECRET || 'secret',
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: true,
                    maxAge: 60000,
                },
            },
        },
    },

    i18n: {
        localeFiles: './src/locale',
        default: 'en',
    },

    rpc: {
        enabled: true,
        preLoadContracts: true,
    },

    view: {
        extractInlineScript: false,
        minifyHTML: true,
    },

    repository: {
        type: 'sqlite',
        database: './database.sqlite',
        synchronize: true,
        logging: false,
    },

    cache: {
        store: '@tirke/node-cache-manager-ioredis',
        getter: 'ioRedisStore',
        host: 'localhost',
        port: 6379,
        ttl: 600,
    },

    auth: {
        localRegister: true,
        localLogin: true,
        jwtSecret: process.env.JWT_SECRET || 'secret',
        expiresIn: 60 * 60,
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
    },

    keyv: {
        uri: 'redis://localhost:6379',
        options: {
            namespace: 'cmmv',
            ttl: 600,
            adapter: 'redis',
        },
    },

    head: {
        title: 'CMMV',
        htmlAttrs: {
            lang: 'pt-br',
        },
        meta: [
            { charset: 'utf-8' },
            {
                'http-equiv': 'content-type',
                content: 'text/html; charset=UTF-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
        ],
        link: [{ rel: 'icon', href: 'assets/favicon/favicon.ico' }],
    },

    headers: {
        'Content-Security-Policy': [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-hashes'",
            "style-src 'self' 'unsafe-inline'",
            "font-src 'self'",
            "connect-src 'self'",
        ],
    },

    scripts: [
        {
            type: 'text/javascript',
            src: '/assets/bundle.min.js',
            defer: 'defer',
        },
    ],
});
