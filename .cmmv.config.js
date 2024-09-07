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
            { rel: 'icon', href: 'assets/favicon/favicon.ico' },
            //{ rel: "dns-prefetch", href: "http://localhost:3000" },
            //{ rel: "preconnect", href: "http://localhost:3000" },     
        ]
    },

    headers: {
        "Content-Security-Policy": [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "font-src 'self'",
            "connect-src 'self' ws://localhost:3001 http://localhost:3001"
        ]
    },

    scripts: [
        { type: "text/javascript", src: '/assets/bundle.min.js' }
    ]
};