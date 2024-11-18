"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const view_registry_1 = require("./registries/view.registry");
tslib_1.__exportStar(require("./lib/cmmv.renderview"), exports);
tslib_1.__exportStar(require("./lib/cmmv.template"), exports);
tslib_1.__exportStar(require("./lib/cmmv.directives"), exports);
tslib_1.__exportStar(require("./lib/cmmv.eval"), exports);
tslib_1.__exportStar(require("./lib/cmmv.utils"), exports);
tslib_1.__exportStar(require("./transpilers"), exports);
tslib_1.__exportStar(require("./registries/view.registry"), exports);
tslib_1.__exportStar(require("./modules/view.module"), exports);
(async (_) => {
    await view_registry_1.ViewRegistry.load();
})();
