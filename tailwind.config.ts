/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vueform.config.js',
        './node_modules/.pnpm/@vueform+vueform@*/node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
        './node_modules/.pnpm/@vueform+vueform@*/node_modules/@vueform/vueform/themes/tailwind/**/*.js',
    ],
    darkMode: 'class',
    purge: ['./index.html', './public/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [require('@vueform/vueform/tailwind')],
};
