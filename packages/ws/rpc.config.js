"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPCConfig = void 0;
exports.RPCConfig = {
    rpc: {
        enabled: {
            required: true,
            type: 'boolean',
            default: true,
        },
        preLoadContracts: {
            required: true,
            type: 'boolean',
            default: true,
        },
    },
};
