module.exports = {
    env: process.env.NODE_ENV,
    
    server: {
        host: process.env.HOST || "0.0.0.0",
        port: process.env.PORT || 3000,
        sessionSecret: process.env.SESSION_SECRET || "secret",
        sessionCookieName: process.env.SESSION_COOKIENAME || "cmmv-session"
    },

    i18n: {
        localeFiles: "./src/locale",
        default: "en"
    },

    rpc:{
        enabled: true,
        preLoadContracts: true
    },

    view: {
        extractInlineScript: true,
        minifyHTML: true
    },

    repository: {
        type: "sqlite",
        database: "./database.sqlite",
        synchronize: true,
        logging: false
    },

    cache: {
        store: "@tirke/node-cache-manager-ioredis",
        getter: "ioRedisStore",
        host: "localhost",
        port: 6379,
        ttl: 600
    },

    auth: {
        localRegister: true,
        localLogin: true,
        jwtSecret: process.env.JWT_SECRET,
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
        }
    },

    head: {
        title: "CMMV",
        htmlAttrs: {
            lang: "pt-br"
        },
        meta: [
            { charset: 'utf-8' },
            { "http-equiv": "content-type", content: "text/html; charset=UTF-8" },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ],
        link: [
            { rel: 'icon', href: 'assets/favicon/favicon.ico' }   
        ]
    },

    headers: {
        "Content-Security-Policy": [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "font-src 'self'",
            "connect-src 'self'"
        ]
    },

    scripts: [
        { type: "text/javascript", src: '/assets/bundle.min.js' }
    ]
};