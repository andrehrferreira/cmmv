/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

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
        let result = await this.rolesservice.getAll(queries, req);
        return result;
    }

    @Get(':id')
    @Auth('roles:get')
    async getById(@Param('id') id: string, @Req() req) {
        let result = await this.rolesservice.getById(id, req);
        return result;
    }

    @Get(':id/raw')
    @Auth('roles:get')
    async getByIdRaw(@Param('id') id: string, @Req() req) {
        let result = await this.rolesservice.getById(id, req);
        return RolesFastSchema(result.data);
    }

    @Post()
    @Auth('roles:insert')
    async add(@Body() item: Roles, @Req() req) {
        let result = await this.rolesservice.add(item, req);
        return result;
    }

    @Put(':id')
    @Auth('roles:update')
    async update(@Param('id') id: string, @Body() item: Roles, @Req() req) {
        let result = await this.rolesservice.update(id, item, req);
        return result;
    }

    @Delete(':id')
    @Auth('roles:delete')
    async delete(@Param('id') id: string, @Req() req) {
        let result = await this.rolesservice.delete(id, req);
        return result;
    }
}
