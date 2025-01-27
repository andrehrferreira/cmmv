/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { Telemetry } from '@cmmv/core';
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
    I18nCoins,
    I18nCoinsFastSchema,
} from '../../models/i18n/i18ncoins.model';

import { I18nCoinsService } from '../../services/i18n/i18ncoins.service';

@Controller('i18ncoins')
export class I18nCoinsControllerGenerated {
    constructor(private readonly i18ncoinsservice: I18nCoinsService) {}

    @Get()
    @Auth('i18ncoins:get')
    async getAll(@Queries() queries: any, @Req() req) {
        Telemetry.start('I18nCoinsController::GetAll', req.requestId);
        let result = await this.i18ncoinsservice.getAll(queries, req);
        Telemetry.end('I18nCoinsController::GetAll', req.requestId);
        return result;
    }

    @Get(':id')
    @Auth('i18ncoins:get')
    async getById(@Param('id') id: string, @Req() req) {
        Telemetry.start('I18nCoinsController::GetById', req.requestId);
        let result = await this.i18ncoinsservice.getById(id, req);
        Telemetry.end('I18nCoinsController::GetById', req.requestId);
        return result;
    }

    @Post()
    @Auth('i18ncoins:insert')
    async add(@Body() item: I18nCoins, @Req() req) {
        Telemetry.start('I18nCoinsController::Add', req.requestId);
        let result = await this.i18ncoinsservice.add(item, req);
        Telemetry.end('I18nCoinsController::Add', req.requestId);
        return result;
    }

    @Put(':id')
    @Auth('i18ncoins:update')
    async update(@Param('id') id: string, @Body() item: I18nCoins, @Req() req) {
        Telemetry.start('I18nCoinsController::Update', req.requestId);
        let result = await this.i18ncoinsservice.update(id, item, req);
        Telemetry.end('I18nCoinsController::Update', req.requestId);
        return result;
    }

    @Delete(':id')
    @Auth('i18ncoins:delete')
    async delete(
        @Param('id') id: string,
        @Req() req,
    ): Promise<{ success: boolean; affected: number }> {
        Telemetry.start('I18nCoinsController::Delete', req.requestId);
        let result = await this.i18ncoinsservice.delete(id, req);
        Telemetry.end('I18nCoinsController::Delete', req.requestId);
        return result;
    }
}
