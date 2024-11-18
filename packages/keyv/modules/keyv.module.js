"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyvModule = void 0;
const core_1 = require("@cmmv/core");
const keyv_service_1 = require("../services/keyv.service");
exports.KeyvModule = new core_1.Module('keyv', {
    providers: [keyv_service_1.KeyvService],
});
