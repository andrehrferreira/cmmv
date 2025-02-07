/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { Rpc, Message, Data, Socket, RpcUtils } from '@cmmv/ws';
import { Cache, CacheService } from '@cmmv/cache';

import {
    AddI18nCountriesRequest,
    UpdateI18nCountriesRequest,
    DeleteI18nCountriesRequest,
} from '@protos/i18n/i18ncountries.d';

import { I18nCountries } from '@models/i18n/i18ncountries.model';

import { I18nCountriesService } from '@services/i18n/i18ncountries.service';

@Rpc('i18ncountries')
export class I18nCountriesGateway {
    constructor(private readonly i18ncountriesservice: I18nCountriesService) {}

    @Message('GetAllI18nCountriesRequest')
    async getAll(@Socket() socket) {
        try {
            const items = await this.i18ncountriesservice.getAll();

            const response = await RpcUtils.pack(
                'i18ncountries',
                'GetAllI18nCountriesResponse',
                items.data,
            );

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('AddI18nCountriesRequest')
    async insert(@Data() data: AddI18nCountriesRequest, @Socket() socket) {
        try {
            const i18ncountries = I18nCountries.fromPartial(data.item);
            const result =
                await this.i18ncountriesservice.insert(i18ncountries);
            const response = await RpcUtils.pack(
                'i18ncountries',
                'AddI18nCountriesResponse',
                { item: result, id: result._id },
            );

            CacheService.set(
                `country:${result._id}`,
                JSON.stringify(result),
                600,
            );
            CacheService.del('country:getAll');

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('UpdateI18nCountriesRequest')
    async update(@Data() data: UpdateI18nCountriesRequest, @Socket() socket) {
        try {
            const result = await this.i18ncountriesservice.update(
                data.id,
                data.item,
            );
            const response = await RpcUtils.pack(
                'i18ncountries',
                'UpdateI18nCountriesResponse',
                {
                    success: result.success,
                    affected: result.affected,
                },
            );

            CacheService.set(`country:${data.id}`, JSON.stringify(result), 600);
            CacheService.del('country:getAll');

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('DeleteI18nCountriesRequest')
    async delete(@Data() data: DeleteI18nCountriesRequest, @Socket() socket) {
        try {
            const result = await this.i18ncountriesservice.delete(data.id);
            const response = await RpcUtils.pack(
                'i18ncountries',
                'DeleteI18nCountriesResponse',
                {
                    success: result.success,
                    affected: result.affected,
                },
            );

            CacheService.del(`country:${data.id}`);
            CacheService.del('country:getAll');

            if (response) socket.send(response);
        } catch (e) {}
    }
}
