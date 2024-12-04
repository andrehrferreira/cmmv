"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultHTTPModule = void 0;
const core_1 = require("@cmmv/core");
const http_config_1 = require("./http.config");
const default_transpiler_1 = require("./default.transpiler");
exports.DefaultHTTPModule = new core_1.Module('http', {
    configs: [http_config_1.HTTPConfig],
    transpilers: [default_transpiler_1.DefaultHTTPTranspiler],
});
