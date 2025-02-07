/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { User } from '/mnt/f/Node/cmmv/src/protos/auth/sessions.proto/auth/user.d';

export namespace Sessions {
    export type uuid = string;
    export type fingerprint = string;
    export type user = User;
    export type ipAddress = string;
    export type device = string;
    export type browser = string;
    export type os = string;
    export type revoked = boolean;
}

export interface AddSessionsRequest {
    item: Sessions;
}

export interface AddSessionsResponse {
    item: Sessions;
}

export interface UpdateSessionsRequest {
    id: string;
    item: Sessions;
}

export interface UpdateSessionsResponse {
    success: boolean;
    affected: number;
}

export interface DeleteSessionsRequest {
    id: string;
}

export interface DeleteSessionsResponse {
    success: boolean;
    affected: number;
}

export interface GetAllSessionsRequest {}

export interface GetAllSessionsResponse {
    items: Sessions[];
}
