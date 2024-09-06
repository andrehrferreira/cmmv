// Generated automatically by CMMV

import { Telemetry } from '@cmmv/core';
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Queries,
    Param,
    Body,
    Request,
} from '@cmmv/http';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Controller('user')
export class UserController {
    constructor(private readonly userservice: UserService) {}

    @Get()
    async getAll(@Queries() queries: any, @Request() req): Promise<User[]> {
        Telemetry.start('UserController::GetAll', req.requestId);
        let result = await this.userservice.getAll(queries, req);
        Telemetry.end('UserController::GetAll', req.requestId);
        return result;
    }

    @Get(':id')
    async getById(@Param('id') id: string, @Request() req): Promise<User> {
        Telemetry.start('UserController::GetById', req.requestId);
        let result = await this.userservice.getById(id, req);
        Telemetry.end('UserController::GetById', req.requestId);
        return result;
    }

    @Post()
    async add(@Body() item: User, @Request() req): Promise<User> {
        Telemetry.start('UserController::Add', req.requestId);
        let result = await this.userservice.add(item, req);
        Telemetry.end('UserController::Add', req.requestId);
        return result;
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() item: User,
        @Request() req,
    ): Promise<User> {
        Telemetry.start('UserController::Update', req.requestId);
        let result = await this.userservice.update(id, item, req);
        Telemetry.end('UserController::Update', req.requestId);
        return result;
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
        @Request() req,
    ): Promise<{ success: boolean; affected: number }> {
        Telemetry.start('UserController::Delete', req.requestId);
        let result = await this.userservice.delete(id, req);
        Telemetry.end('UserController::Delete', req.requestId);
        return result;
    }
}
