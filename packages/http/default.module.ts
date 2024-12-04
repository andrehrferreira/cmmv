import { Module } from '@cmmv/core';

import { DefaultHTTPTranspiler } from './default.transpiler';

export const DefaultHTTPModule = new Module('http', {
    transpilers: [DefaultHTTPTranspiler],
});
