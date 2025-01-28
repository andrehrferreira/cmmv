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

import { Rules, RulesFastSchema } from '../../models/auth/rules.model';

import { RulesService } from '../../services/auth/rules.service';

@Controller('rules')
export class RulesControllerGenerated {
    constructor(private readonly rulesservice: RulesService) {}

    @Get()
    @Auth('rules:get')
    async getAll(@Queries() queries: any, @Req() req) {
        Telemetry.start('RulesController::GetAll', req.requestId);
        let result = await this.rulesservice.getAll(queries, req);
        Telemetry.end('RulesController::GetAll', req.requestId);
        return result;
    }

    @Get(':id')
    @Auth('rules:get')
    async getById(@Param('id') id: string, @Req() req) {
        Telemetry.start('RulesController::GetById', req.requestId);
        let result = await this.rulesservice.getById(id, req);
        Telemetry.end('RulesController::GetById', req.requestId);
        return result;
    }

    @Post()
    @Auth('rules:insert')
    async add(@Body() item: Rules, @Req() req) {
        Telemetry.start('RulesController::Add', req.requestId);
        let result = await this.rulesservice.add(item, req);
        Telemetry.end('RulesController::Add', req.requestId);
        return result;
    }

    @Put(':id')
    @Auth('rules:update')
    async update(@Param('id') id: string, @Body() item: Rules, @Req() req) {
        Telemetry.start('RulesController::Update', req.requestId);
        let result = await this.rulesservice.update(id, item, req);
        Telemetry.end('RulesController::Update', req.requestId);
        return result;
    }

    @Delete(':id')
    @Auth('rules:delete')
    async delete(
        @Param('id') id: string,
        @Req() req,
    ): Promise<{ success: boolean; affected: number }> {
        Telemetry.start('RulesController::Delete', req.requestId);
        let result = await this.rulesservice.delete(id, req);
        Telemetry.end('RulesController::Delete', req.requestId);
        return result;
    }
}
