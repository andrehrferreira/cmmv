import { Module } from '@cmmv/core';
import { ExpressTranspile } from '../transpilers/express.transpiler';

export const ExpressModule = new Module('express', {
    transpilers: [ExpressTranspile],
});
