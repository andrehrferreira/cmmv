// eslint.config.js
const js = require('@eslint/js');

module.exports = [
    js.configs.recommended,
    {
        ignores: ['**/node_modules/**', '*.d.ts', '*.js', '**/*.spec.ts'],
        files: ['packages/**/*.ts'],
        rules: {},
    },
];
