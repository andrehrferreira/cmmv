"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewModule = void 0;
const core_1 = require("@cmmv/core");
const view_config_1 = require("./view.config");
const view_transpile_1 = require("./view.transpile");
exports.ViewModule = new core_1.Module('view', {
    configs: [view_config_1.ViewConfig],
    transpilers: [view_transpile_1.ViewTranspile],
});
