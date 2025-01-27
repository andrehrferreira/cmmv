/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

export namespace User {
    export type username = string;
    export type password = string;
    export type googleId = string;
    export type groups = string;
    export type roles = string;
    export type root = boolean;
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
