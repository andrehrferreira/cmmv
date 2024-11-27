"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViteModule = void 0;
const core_1 = require("@cmmv/core");
const vite_controller_1 = require("../controllers/vite.controller");
exports.ViteModule = new core_1.Module('vite', {
    controllers: [vite_controller_1.ViteController, vite_controller_1.ViteAliasController],
});
