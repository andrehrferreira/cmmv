/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { Rpc, Message, Data, Socket, RpcUtils } from '@cmmv/ws';
import { plainToClass } from 'class-transformer';
import { I18nCoinsEntity } from '../../entities/i18n/i18ncoins.entity';
import { Cache, CacheService } from '@cmmv/cache';

import {
    AddI18nCoinsRequest,
    UpdateI18nCoinsRequest,
    DeleteI18nCoinsRequest,
} from '../../protos/i18n/i18ncoins.d';

import { I18nCoinsService } from '../../services/i18n/i18ncoins.service';

@Rpc('i18ncoins')
export class I18nCoinsGateway {
    constructor(private readonly i18ncoinsservice: I18nCoinsService) {}

    @Message('GetAllI18nCoinsRequest')
    async getAll(@Socket() socket) {
        try {
            const items = await this.i18ncoinsservice.getAll();

            const response = await RpcUtils.pack(
                'i18ncoins',
                'GetAllI18nCoinsResponse',
                items.data,
            );

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('AddI18nCoinsRequest')
    async add(@Data() data: AddI18nCoinsRequest, @Socket() socket) {
        try {
            const entity = plainToClass(I18nCoinsEntity, data.item);
            const result = await this.i18ncoinsservice.add(entity);
            const response = await RpcUtils.pack(
                'i18ncoins',
                'AddI18nCoinsResponse',
                { item: result, id: result._id },
            );

            CacheService.set(
                `coins:${result._id}`,
                JSON.stringify(result),
                3000,
            );
            CacheService.del('coins:getAll');

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('UpdateI18nCoinsRequest')
    async update(@Data() data: UpdateI18nCoinsRequest, @Socket() socket) {
        try {
            const entity = plainToClass(I18nCoinsEntity, data.item);
            const result = await this.i18ncoinsservice.update(data.id, entity);
            const response = await RpcUtils.pack(
                'i18ncoins',
                'UpdateI18nCoinsResponse',
                {
                    success: result.success,
                    affected: result.affected,
                },
            );

            CacheService.set(`coins:${data.id}`, JSON.stringify(result), 3000);
            CacheService.del('coins:getAll');

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('DeleteI18nCoinsRequest')
    async delete(@Data() data: DeleteI18nCoinsRequest, @Socket() socket) {
        try {
            const result = await this.i18ncoinsservice.delete(data.id);
            const response = await RpcUtils.pack(
                'i18ncoins',
                'DeleteI18nCoinsResponse',
                {
                    success: result.success,
                    affected: result.affected,
                },
            );

            CacheService.del(`coins:${data.id}`);
            CacheService.del('coins:getAll');

            if (response) socket.send(response);
        } catch (e) {}
    }
}
