/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { Telemetry } from '@cmmv/core';
import { Cache, CacheService } from '@cmmv/cache';
import { Auth } from '@cmmv/auth';

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

import {
    I18nCountries,
    I18nCountriesFastSchema,
} from '../../models/i18n/i18ncountries.model';

import { I18nCountriesService } from '../../services/i18n/i18ncountries.service';

@Controller('/i18n/countries')
export class I18nCountriesControllerGenerated {
    constructor(private readonly i18ncountriesservice: I18nCountriesService) {}

    @Get()
    @Auth('i18ncountries:get')
    @Cache('country:getAll', {
        ttl: 600,
        compress: true,
        schema: I18nCountriesFastSchema,
    })
    async getAll(@Queries() queries: any, @Req() req) {
        Telemetry.start('I18nCountriesController::GetAll', req.requestId);
        let result = await this.i18ncountriesservice.getAll(queries, req);
        Telemetry.end('I18nCountriesController::GetAll', req.requestId);
        return result;
    }

    @Get(':id')
    @Auth('i18ncountries:get')
    @Cache('country:getAll', {
        ttl: 600,
        compress: true,
        schema: I18nCountriesFastSchema,
    })
    async getById(@Param('id') id: string, @Req() req) {
        Telemetry.start('I18nCountriesController::GetById', req.requestId);
        let result = await this.i18ncountriesservice.getById(id, req);
        Telemetry.end('I18nCountriesController::GetById', req.requestId);
        return result;
    }

    @Post()
    @Auth('i18ncountries:insert')
    async add(@Body() item: I18nCountries, @Req() req) {
        Telemetry.start('I18nCountriesController::Add', req.requestId);
        let result = await this.i18ncountriesservice.add(item, req);
        CacheService.del('country:getAll');
        Telemetry.end('I18nCountriesController::Add', req.requestId);
        return result;
    }

    @Put(':id')
    @Auth('i18ncountries:update')
    async update(
        @Param('id') id: string,
        @Body() item: I18nCountries,
        @Req() req,
    ) {
        Telemetry.start('I18nCountriesController::Update', req.requestId);
        let result = await this.i18ncountriesservice.update(id, item, req);
        CacheService.del(`country:${id}`);
        CacheService.del('country:getAll');
        Telemetry.end('I18nCountriesController::Update', req.requestId);
        return result;
    }

    @Delete(':id')
    @Auth('i18ncountries:delete')
    async delete(
        @Param('id') id: string,
        @Req() req,
    ): Promise<{ success: boolean; affected: number }> {
        Telemetry.start('I18nCountriesController::Delete', req.requestId);
        let result = await this.i18ncountriesservice.delete(id, req);
        CacheService.del(`country:${id}`);
        CacheService.del('country:getAll');
        Telemetry.end('I18nCountriesController::Delete', req.requestId);
        return result;
    }
}
