// Generated automatically by CMMV

export namespace User {
    export type name = string;
    export type username = string;
    export type password = string;
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
    item: User;
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
