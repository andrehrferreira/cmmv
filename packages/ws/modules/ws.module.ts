import { Module } from '@cmmv/core';

import { WSTranspile } from '../transpilers/ws.transpile';
import { WSContract, WSError } from '../contracts/ws.contract';

export const WSModule = new Module('ws', {
    contracts: [WSContract, WSError],
    transpilers: [WSTranspile],
});
