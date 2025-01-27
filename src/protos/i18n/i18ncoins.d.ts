/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

export namespace I18nCoins {
    export type code = string;
    export type name = string;
    export type format = string;
}

export interface AddI18nCoinsRequest {
    item: I18nCoins;
}

export interface AddI18nCoinsResponse {
    item: I18nCoins;
}

export interface UpdateI18nCoinsRequest {
    id: string;
    item: I18nCoins;
}

export interface UpdateI18nCoinsResponse {
    item: I18nCoins;
}

export interface DeleteI18nCoinsRequest {
    id: string;
}

export interface DeleteI18nCoinsResponse {
    success: boolean;
    affected: number;
    id: string;
}

export interface GetAllI18nCoinsRequest {}

export interface GetAllI18nCoinsResponse {
    items: I18nCoins[];
}
