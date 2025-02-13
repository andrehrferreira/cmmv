/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

export namespace Roles {
    export type name = string;
}

export interface AddRolesRequest {
    item: Roles;
}

export interface AddRolesResponse {
    item: Roles;
}

export interface UpdateRolesRequest {
    id: string;
    item: Roles;
}

export interface UpdateRolesResponse {
    success: boolean;
    affected: number;
}

export interface DeleteRolesRequest {
    id: string;
}

export interface DeleteRolesResponse {
    success: boolean;
    affected: number;
}

export interface GetAllRolesRequest {}

export interface GetAllRolesResponse {
    items: Roles[];
}
