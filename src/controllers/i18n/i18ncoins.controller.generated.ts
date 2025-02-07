/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { Cache, CacheService } from '@cmmv/cache';

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Queries,
    Param,
    Body,
    Req,
} from '@cmmv/http';

import { I18nCoins, I18nCoinsFastSchema } from '@models/i18n/i18ncoins.model';

import { I18nCoinsService } from '@services/i18n/i18ncoins.service';

@Controller('/i18n/coins')
export class I18nCoinsControllerGenerated {
    constructor(private readonly i18ncoinsservice: I18nCoinsService) {}

    @Get()
    @Cache('coins:getAll', {
        ttl: 3000,
        compress: true,
        schema: I18nCoinsFastSchema,
    })
    async getAll(@Queries() queries: any, @Req() req) {
        return this.i18ncoinsservice.getAll(queries, req);
    }

    @Get(':id')
    async getById(@Param('id') id: string, @Req() req) {
        const cacheData = await CacheService.get(`coins:${id}`);
        return cacheData ? cacheData : this.i18ncoinsservice.getById(id, req);
    }

    @Get(':id/raw')
    async getByIdRaw(@Param('id') id: string, @Req() req) {
        let result = await this.i18ncoinsservice.getById(id, req);
        return I18nCoinsFastSchema(result.data);
    }

    @Post()
    async insert(@Body() item: I18nCoins, @Req() req) {
        let result = await this.i18ncoinsservice.insert(item, req);
        await CacheService.del('coins:getAll');
        return result;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() item: I18nCoins, @Req() req) {
        let result = await this.i18ncoinsservice.update(id, item, req);
        await CacheService.del(`coins:${id}`);
        await CacheService.del('coins:getAll');
        return result;
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Req() req) {
        let result = await this.i18ncoinsservice.delete(id, req);
        await CacheService.del(`coins:${id}`);
        await CacheService.del('coins:getAll');
        return result;
    }
}
