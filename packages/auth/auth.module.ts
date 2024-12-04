import { Module } from '@cmmv/core';

import { AuthConfig } from './auth.config';
import { AuthService } from './auth.service';
import { AuthTranspile } from './auth.transpiler';
import { AuthContract } from './auth.contract';

export const AuthModule = new Module('auth', {
    configs: [AuthConfig],
    providers: [AuthService],
    transpilers: [AuthTranspile],
    contracts: [AuthContract],
});
