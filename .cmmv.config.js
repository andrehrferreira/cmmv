module.exports = {
    env: process.env.NODE_ENV,

    app: {
        telemetry: false
    },

    server: {
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || 3000,
        poweredBy: false,
        removePolicyHeaders: false,
        publicDirs: ["public", 'public/views'],
        render: "@cmmv/view",
        compress: {
            enabled: true,
            options: {
                level: 6,
            },
        },
        cors: true,
        logging: "all",
        helmet: {
            enabled: false,
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
        scriptsTimestamp: false
    },

    repository: {
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'cmmv',
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
        expiresIn: 60 * 60 * 24,
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
        qrCode: {
            image: 'public/assets/favicon/android-chrome-512x512.png',
            "type": "canvas",
            "shape": "square",
            "width": 300,
            "height": 300,
            "margin": 0,
            "qrOptions": {
                "typeNumber": "0",
                "mode": "Byte",
                "errorCorrectionLevel": "Q"
            },
            "imageOptions": {
                "saveAsBlob": true,
                "hideBackgroundDots": true,
                "imageSize": 0.4,
                "margin": 0
            },
            "dotsOptions": {
                "type": "square",
                "color": "#000000",
                "roundSize": true
            },
            "backgroundOptions": {
                "round": 0,
                "color": "#ffffff"
            },
            "dotsOptionsHelper": {
                "colorType": {
                    "single": true,
                    "gradient": false
                },
                "gradient": {
                    "linear": true,
                    "radial": false,
                    "color1": "#6a1a4c",
                    "color2": "#6a1a4c",
                    "rotation": "0"
                }
            },
            "cornersSquareOptions": {
                "type": "dot",
                "color": "#000000",
                "gradient": null
            },
            "cornersSquareOptionsHelper": {
                "colorType": {
                    "single": true,
                    "gradient": false
                },
                "gradient": {
                    "linear": true,
                    "radial": false,
                    "color1": "#000000",
                    "color2": "#000000",
                    "rotation": "0"
                }
            },
            "cornersDotOptions": {
                "type": "",
                "color": "#000000"
            },
            "cornersDotOptionsHelper": {
                "colorType": {
                    "single": true,
                    "gradient": false
                },
                "gradient": {
                    "linear": true,
                    "radial": false,
                    "color1": "#000000",
                    "color2": "#000000",
                    "rotation": "0"
                }
            },
            "backgroundOptionsHelper": {
                "colorType": {
                    "single": true,
                    "gradient": false
                },
                "gradient": {
                    "linear": true,
                    "radial": false,
                    "color1": "#ffffff",
                    "color2": "#ffffff",
                    "rotation": "0"
                    }
            }
        }
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
        link: [
            { rel: 'icon', href: 'assets/favicon/favicon.ico' },
            { rel: 'stylesheet', href: '/assets/bundle.min.css' }
        ],
    },

    scripts: [
        {
            type: 'module',
            src: '/assets/bundle.min.js',
            defer: 'defer',
        }
    ],
};