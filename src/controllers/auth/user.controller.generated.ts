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
} from '../../models/auth/user.model';

import { UserService } from '../../services/auth/user.service';

@Controller('user')
export class UserControllerGenerated {
    constructor(private readonly userservice: UserService) {}

    @Get()
    @Auth('user:get')
    async getAll(@Queries() queries: any, @Req() req): Promise<User[] | null> {
        let result = await this.userservice.getAll(queries, req);
        return result;
    }

    @Get(':id')
    @Auth('user:get')
    async getById(@Param('id') id: string, @Req() req): Promise<User | null> {
        let result = await this.userservice.getById(id, req);
        return result;
    }

    @Post()
    @Auth('user:insert')
    async add(@Body() item: User, @Req() req): Promise<User | null> {
        let result = await this.userservice.add(item, req);
        return result;
    }

    @Put(':id')
    @Auth('user:update')
    async update(
        @Param('id') id: string,
        @Body() item: User,
        @Req() req,
    ): Promise<{ success: boolean; affected: number }> {
        let result = await this.userservice.update(id, item, req);
        return result;
    }

    @Delete(':id')
    @Auth('user:delete')
    async delete(
        @Param('id') id: string,
        @Req() req,
    ): Promise<{ success: boolean; affected: number }> {
        let result = await this.userservice.delete(id, req);
        return result;
    }
}
