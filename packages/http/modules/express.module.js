"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressModule = void 0;
const core_1 = require("@cmmv/core");
const express_transpiler_1 = require("../transpilers/express.transpiler");
exports.ExpressModule = new core_1.Module('express', {
    transpilers: [express_transpiler_1.ExpressTranspile],
});
