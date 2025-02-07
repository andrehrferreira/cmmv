/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { Roles } from '/mnt/f/Node/cmmv/src/protos/auth/groups.proto/auth/roles.d';

export namespace Groups {
    export type name = string;
    export type roles = Roles;
}

export interface AddGroupsRequest {
    item: Groups;
}

export interface AddGroupsResponse {
    item: Groups;
}

export interface UpdateGroupsRequest {
    id: string;
    item: Groups;
}

export interface UpdateGroupsResponse {
    success: boolean;
    affected: number;
}

export interface DeleteGroupsRequest {
    id: string;
}

export interface DeleteGroupsResponse {
    success: boolean;
    affected: number;
}

export interface GetAllGroupsRequest {}

export interface GetAllGroupsResponse {
    items: Groups[];
}
