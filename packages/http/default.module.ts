import { Module } from '@cmmv/core';

import { HTTPConfig } from './http.config';
import { DefaultHTTPTranspiler } from './default.transpiler';

export const DefaultHTTPModule = new Module('http', {
    configs: [HTTPConfig],
    transpilers: [DefaultHTTPTranspiler],
});
