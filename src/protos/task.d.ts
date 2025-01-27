/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

export namespace Task {
    export type label = string;
    export type checked = boolean;
    export type removed = boolean;
    export type createAt = string;
}

export interface AddTaskRequest {
    item: Task;
}

export interface AddTaskResponse {
    item: Task;
}

export interface UpdateTaskRequest {
    id: string;
    item: Task;
}

export interface UpdateTaskResponse {
    item: Task;
}

export interface DeleteTaskRequest {
    id: string;
}

export interface DeleteTaskResponse {
    success: boolean;
    affected: number;
    id: string;
}

export interface GetAllTaskRequest {}

export interface GetAllTaskResponse {
    items: Task[];
}
