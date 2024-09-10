import { Module } from '@cmmv/core';

import { AuthService } from './auth.service';
import { AuthTranspile } from './auth.transpiler';
import { AuthContract } from './auth.contract';

export let AuthModule = new Module('auth', {
    providers: [AuthService],
    transpilers: [AuthTranspile],
    contracts: [AuthContract],
});
