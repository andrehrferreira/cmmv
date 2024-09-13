import { Module } from '@cmmv/core';

import { AuthService } from '../services/auth.service';
import { AuthTranspile } from '../transpilers/auth.transpiler';
import { AuthContract } from '../contracts/auth.contract';

export const AuthModule = new Module('auth', {
    providers: [AuthService],
    transpilers: [AuthTranspile],
    contracts: [AuthContract],
});
