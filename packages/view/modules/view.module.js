"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewModule = void 0;
const core_1 = require("@cmmv/core");
const view_transpile_1 = require("../transpilers/view.transpile");
exports.ViewModule = new core_1.Module('view', {
    transpilers: [view_transpile_1.ViewTranspile],
});
