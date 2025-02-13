/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { Groups } from './groups.d';
import { Roles } from './roles.d';

export namespace User {
    export type username = string;
    export type password = string;
    export type provider = string;
    export type groups = Groups;
    export type roles = Roles;
    export type root = boolean;
    export type blocked = boolean;
    export type validated = boolean;
    export type verifyEmail = boolean;
    export type verifyEmailCode = number;
    export type verifySMS = boolean;
    export type verifySMSCode = number;
    export type optSecret = string;
    export type optSecretVerify = boolean;
}

export interface AddUserRequest {
    item: User;
}

export interface AddUserResponse {
    item: User;
}

export interface UpdateUserRequest {
    id: string;
    item: User;
}

export interface UpdateUserResponse {
    success: boolean;
    affected: number;
}

export interface DeleteUserRequest {
    id: string;
}

export interface DeleteUserResponse {
    success: boolean;
    affected: number;
}

export interface GetAllUserRequest {}

export interface GetAllUserResponse {
    items: User[];
}
