import { Module } from '@cmmv/core';

import { CacheService } from '../services/cache.service';

export const CacheModule = new Module('cache', {
    providers: [CacheService],
});
