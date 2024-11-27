"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViteAliasController = exports.ViteController = void 0;
const tslib_1 = require("tslib");
const http_1 = require("@cmmv/http");
let ViteController = class ViteController {
    async getNodeModules(req, res) { }
    async getAlias(req, res) { }
};
exports.ViteController = ViteController;
tslib_1.__decorate([
    (0, http_1.Get)('*'),
    tslib_1.__param(0, (0, http_1.Req)()),
    tslib_1.__param(1, (0, http_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ViteController.prototype, "getNodeModules", null);
tslib_1.__decorate([
    (0, http_1.Get)('@*'),
    tslib_1.__param(0, (0, http_1.Req)()),
    tslib_1.__param(1, (0, http_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ViteController.prototype, "getAlias", null);
exports.ViteController = ViteController = tslib_1.__decorate([
    (0, http_1.Controller)('node_modules')
], ViteController);
let ViteAliasController = class ViteAliasController {
    async getNodeModules(req, res) { }
    async getAlias(req, res) { }
};
exports.ViteAliasController = ViteAliasController;
tslib_1.__decorate([
    (0, http_1.Get)('*'),
    tslib_1.__param(0, (0, http_1.Req)()),
    tslib_1.__param(1, (0, http_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ViteAliasController.prototype, "getNodeModules", null);
tslib_1.__decorate([
    (0, http_1.Get)('@*'),
    tslib_1.__param(0, (0, http_1.Req)()),
    tslib_1.__param(1, (0, http_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ViteAliasController.prototype, "getAlias", null);
exports.ViteAliasController = ViteAliasController = tslib_1.__decorate([
    (0, http_1.Controller)()
], ViteAliasController);
