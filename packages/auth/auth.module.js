"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const core_1 = require("@cmmv/core");
const auth_config_1 = require("./auth.config");
const auth_service_1 = require("./auth.service");
const auth_transpiler_1 = require("./auth.transpiler");
const auth_contract_1 = require("./auth.contract");
exports.AuthModule = new core_1.Module('auth', {
    configs: [auth_config_1.AuthConfig],
    providers: [auth_service_1.AuthService],
    transpilers: [auth_transpiler_1.AuthTranspile],
    contracts: [auth_contract_1.AuthContract],
});
