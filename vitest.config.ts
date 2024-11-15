import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'node_modules'),
            '@cmmv/auth': path.resolve(__dirname, 'packages/core/auth'),
            '@cmmv/cache': path.resolve(__dirname, 'packages/core/cache'),
            '@cmmv/core': path.resolve(__dirname, 'packages/core'),
            '@cmmv/http': path.resolve(__dirname, 'packages/http'),
        },
    },
    test: {
        globals: true,
        environment: 'node',
    },
});
