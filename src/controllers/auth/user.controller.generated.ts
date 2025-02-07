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

import {
    User,
    UserFastSchema,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from '@models/auth/user.model';

import { UserService } from '@services/auth/user.service';

@Controller('user')
export class UserControllerGenerated {
    constructor(private readonly userservice: UserService) {}

    @Get()
    @Auth('user:get')
    async getAll(@Queries() queries: any, @Req() req) {
        return this.userservice.getAll(queries, req);
    }

    @Get(':id')
    @Auth('user:get')
    async getById(@Param('id') id: string, @Req() req) {
        return this.userservice.getById(id, req);
    }

    @Get(':id/raw')
    @Auth('user:get')
    async getByIdRaw(@Param('id') id: string, @Req() req) {
        let result = await this.userservice.getById(id, req);
        return UserFastSchema(result.data);
    }

    @Post()
    @Auth('user:insert')
    async insert(@Body() item: User, @Req() req) {
        let result = await this.userservice.insert(item, req);
        return result;
    }

    @Put(':id')
    @Auth('user:update')
    async update(@Param('id') id: string, @Body() item: User, @Req() req) {
        let result = await this.userservice.update(id, item, req);
        return result;
    }

    @Delete(':id')
    @Auth('user:delete')
    async delete(@Param('id') id: string, @Req() req) {
        let result = await this.userservice.delete(id, req);
        return result;
    }
}
