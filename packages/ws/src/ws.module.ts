import { Module } from '@cmmv/core';

import { WSTranspile } from './ws.transpile';
import { WSContract, WSError } from './ws.contract';

export let WSModule = new Module('ws', {
    contracts: [WSContract, WSError],
    transpilers: [WSTranspile],
});
