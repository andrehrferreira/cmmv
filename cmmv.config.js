export default {
    server: {
        port: 3000
    },

    head: {
        title: "CMMV",
        htmlAttrs: {
            lang: "pt-br"
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ],
        link: [
            { rel: 'apple-touch-icon', sizes: '180x180', href: 'assets/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'assets/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'assets/favicon-16x16.png' },
            { rel: 'manifest', href: 'assets/site.webmanifest' },
            { rel: "dns-prefetch", href: "http://localhost:3000" },
            { rel: "preconnect", href: "http://localhost:3000" },     
        ]
    }
};