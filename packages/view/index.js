"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const view_registry_1 = require("./view.registry");
tslib_1.__exportStar(require("./lib/cmmv.renderview"), exports);
tslib_1.__exportStar(require("./lib/cmmv.template"), exports);
tslib_1.__exportStar(require("./lib/cmmv.directives"), exports);
tslib_1.__exportStar(require("./lib/cmmv.eval"), exports);
tslib_1.__exportStar(require("./lib/cmmv.utils"), exports);
tslib_1.__exportStar(require("./view.config"), exports);
tslib_1.__exportStar(require("./view.transpile"), exports);
tslib_1.__exportStar(require("./vue.transpile"), exports);
tslib_1.__exportStar(require("./view.registry"), exports);
tslib_1.__exportStar(require("./view.module"), exports);
(async (_) => {
    await view_registry_1.ViewRegistry.load();
})();
