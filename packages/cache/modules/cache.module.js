"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheModule = void 0;
const core_1 = require("@cmmv/core");
const cache_service_1 = require("../services/cache.service");
exports.CacheModule = new core_1.Module('cache', {
    providers: [cache_service_1.CacheService],
});
