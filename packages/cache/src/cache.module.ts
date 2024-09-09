import { Module } from '@cmmv/core';

import { CacheService } from './cache.service';

export let CacheModule = new Module({
    providers: [CacheService],
});
