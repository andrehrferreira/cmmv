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

import { Groups, GroupsFastSchema } from '@models/auth/groups.model';

import { GroupsService } from '@services/auth/groups.service';

@Controller('groups')
export class GroupsControllerGenerated {
    constructor(private readonly groupsservice: GroupsService) {}

    @Get()
    @Auth('groups:get')
    async getAll(@Queries() queries: any, @Req() req) {
        return this.groupsservice.getAll(queries, req);
    }

    @Get(':id')
    @Auth('groups:get')
    async getById(@Param('id') id: string, @Req() req) {
        return this.groupsservice.getById(id, req);
    }

    @Get(':id/raw')
    @Auth('groups:get')
    async getByIdRaw(@Param('id') id: string, @Req() req) {
        let result = await this.groupsservice.getById(id, req);
        return GroupsFastSchema(result.data);
    }

    @Post()
    @Auth('groups:insert')
    async insert(@Body() item: Groups, @Req() req) {
        let result = await this.groupsservice.insert(item, req);
        return result;
    }

    @Put(':id')
    @Auth('groups:update')
    async update(@Param('id') id: string, @Body() item: Groups, @Req() req) {
        let result = await this.groupsservice.update(id, item, req);
        return result;
    }

    @Delete(':id')
    @Auth('groups:delete')
    async delete(@Param('id') id: string, @Req() req) {
        let result = await this.groupsservice.delete(id, req);
        return result;
    }
}
