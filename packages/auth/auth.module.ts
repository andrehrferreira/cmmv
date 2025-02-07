import { Module } from '@cmmv/core';

import { AuthConfig } from './auth.config';
import { AuthTranspile } from './auth.transpiler';

import { RolesContract } from './roles.contract';
import { GroupsContract } from './groups.contract';
import { UserContract } from './users.contract';
import { SessionsContract } from './sessions.contract';

import { SessionsService } from './sessions.services';

export const AuthModule = new Module('auth', {
    configs: [AuthConfig],
    transpilers: [AuthTranspile],
    contracts: [RolesContract, GroupsContract, UserContract, SessionsContract],
    providers: [SessionsService],
});
