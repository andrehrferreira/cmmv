"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultHTTPModule = void 0;
const core_1 = require("@cmmv/core");
const default_transpiler_1 = require("../transpilers/default.transpiler");
exports.DefaultHTTPModule = new core_1.Module('cmmv-server', {
    transpilers: [default_transpiler_1.DefaultHTTPTranspiler],
});
