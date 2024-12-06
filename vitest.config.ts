import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@cmmv/auth': path.resolve(__dirname, 'packages/core/auth'),
            '@cmmv/cache': path.resolve(__dirname, 'packages/core/cache'),
            '@cmmv/core': path.resolve(__dirname, 'packages/core'),
            '@cmmv/http': path.resolve(__dirname, 'packages/http'),
            '@cmmv/testing': path.resolve(__dirname, 'packages/testing'),
        },
    },
    test: {
        globals: true,
        environment: 'node',
    },
});
