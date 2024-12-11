import { Module } from '@cmmv/core';

import { AuthConfig } from './auth.config';
import { AuthTranspile } from './auth.transpiler';
import { AuthContract } from './auth.contract';

export const AuthModule = new Module('auth', {
    configs: [AuthConfig],
    transpilers: [AuthTranspile],
    contracts: [AuthContract],
});
