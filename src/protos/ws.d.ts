// Types generated automatically by CMMV
export namespace WsCall {
    export type contract = number;
    export type message = number;
    export type data = Uint8Array;
}
export interface AddWsCallRequest {
    item: WsCall;
}
export interface AddWsCallResponse {
    item: WsCall;
}
export interface UpdateWsCallRequest {
    id: string;
    item: WsCall;
}
export interface UpdateWsCallResponse {
    item: WsCall;
}
export interface DeleteWsCallRequest {
    id: string;
}
export interface DeleteWsCallResponse {
    success: boolean;
}
export interface GetAllWsCallRequest {}
export interface GetAllWsCallResponse {
    items: WsCall[];
}
