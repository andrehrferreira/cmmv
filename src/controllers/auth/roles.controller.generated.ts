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

import { Roles, RolesFastSchema } from '../../models/auth/roles.model';

import { RolesService } from '../../services/auth/roles.service';

@Controller('roles')
export class RolesControllerGenerated {
    constructor(private readonly rolesservice: RolesService) {}

    @Get()
    @Auth('roles:get')
    async getAll(@Queries() queries: any, @Req() req) {
        Telemetry.start('RolesController::GetAll', req.requestId);
        let result = await this.rolesservice.getAll(queries, req);
        Telemetry.end('RolesController::GetAll', req.requestId);
        return result;
    }

    @Get(':id')
    @Auth('roles:get')
    async getById(@Param('id') id: string, @Req() req) {
        Telemetry.start('RolesController::GetById', req.requestId);
        let result = await this.rolesservice.getById(id, req);
        Telemetry.end('RolesController::GetById', req.requestId);
        return result;
    }

    @Post()
    @Auth('roles:insert')
    async add(@Body() item: Roles, @Req() req) {
        Telemetry.start('RolesController::Add', req.requestId);
        let result = await this.rolesservice.add(item, req);
        Telemetry.end('RolesController::Add', req.requestId);
        return result;
    }

    @Put(':id')
    @Auth('roles:update')
    async update(@Param('id') id: string, @Body() item: Roles, @Req() req) {
        Telemetry.start('RolesController::Update', req.requestId);
        let result = await this.rolesservice.update(id, item, req);
        Telemetry.end('RolesController::Update', req.requestId);
        return result;
    }

    @Delete(':id')
    @Auth('roles:delete')
    async delete(
        @Param('id') id: string,
        @Req() req,
    ): Promise<{ success: boolean; affected: number }> {
        Telemetry.start('RolesController::Delete', req.requestId);
        let result = await this.rolesservice.delete(id, req);
        Telemetry.end('RolesController::Delete', req.requestId);
        return result;
    }
}
