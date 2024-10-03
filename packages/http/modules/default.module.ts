import { Module } from '@cmmv/core';
import { DefaultHTTPTranspiler } from '../transpilers/default.transpiler';

export const DefaultHTTPModule = new Module('cmmv-server', {
    transpilers: [DefaultHTTPTranspiler],
});
