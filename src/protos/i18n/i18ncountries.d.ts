/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { I18nCoins } from './i18ncoins.d';

export namespace I18nCountries {
    export type code = string;
    export type name = string;
    export type currency = I18nCoins;
}

export interface AddI18nCountriesRequest {
    item: I18nCountries;
}

export interface AddI18nCountriesResponse {
    item: I18nCountries;
}

export interface UpdateI18nCountriesRequest {
    id: string;
    item: I18nCountries;
}

export interface UpdateI18nCountriesResponse {
    success: boolean;
    affected: number;
}

export interface DeleteI18nCountriesRequest {
    id: string;
}

export interface DeleteI18nCountriesResponse {
    success: boolean;
    affected: number;
}

export interface GetAllI18nCountriesRequest {}

export interface GetAllI18nCountriesResponse {
    items: I18nCountries[];
}
