import { Module } from '@cmmv/core';

import { ViteController, ViteAliasController } from './vite.controller';

export const ViteModule = new Module('vite', {
    controllers: [ViteController, ViteAliasController],
});
