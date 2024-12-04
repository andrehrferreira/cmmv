import { ConfigSchema } from '@cmmv/core';

export const RPCConfig: ConfigSchema = {
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
