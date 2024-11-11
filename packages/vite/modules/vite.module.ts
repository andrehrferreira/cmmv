import { Module } from '@cmmv/core';

import {
    ViteController,
    ViteAliasController,
} from '../controllers/vite.controller';

export const ViteModule = new Module('vite', {
    controllers: [ViteController, ViteAliasController],
});
