// Types generated automatically by CMMV
export namespace Task {
  export type label = string;
  export type checked = boolean;
  export type removed = boolean;
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
}
export interface GetAllTaskRequest {}
export interface GetAllTaskResponse {
  items: Task[];
}