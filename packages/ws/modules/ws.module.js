"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSModule = void 0;
const core_1 = require("@cmmv/core");
const ws_transpile_1 = require("../transpilers/ws.transpile");
const ws_contract_1 = require("../contracts/ws.contract");
exports.WSModule = new core_1.Module('ws', {
    contracts: [ws_contract_1.WSContract, ws_contract_1.WSError],
    transpilers: [ws_transpile_1.WSTranspile],
});
