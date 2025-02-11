import { Module } from '@cmmv/core';

import { AuthConfig } from './auth.config';
import { AuthTranspile } from './auth.transpiler';

import {
    RolesContract,
    GroupsContract,
    UserContract,
    SessionsContract,
} from '../contracts';

import { AuthOptService, AuthSessionsService, AuthService } from '../services';

import {
    AuthOPTController,
    AuthController,
    AuthSessionsController,
} from '../controllers';

export const AuthModule = new Module('auth', {
    configs: [AuthConfig],
    transpilers: [AuthTranspile],
    contracts: [RolesContract, GroupsContract, UserContract, SessionsContract],
    providers: [AuthOptService, AuthSessionsService, AuthService],
    controllers: [AuthOPTController, AuthController, AuthSessionsController],
});
