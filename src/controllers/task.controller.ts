// Generated automatically by CMMV

import { Telemetry } from '@cmmv/core';
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
    Request,
} from '@cmmv/http';

import { TaskService } from '../services/task.service';
import { Task, TaskSchema } from '../models/task.model';

@Controller('task')
export class TaskController {
    constructor(private readonly taskservice: TaskService) {}

    @Get()
    @Cache('task:getAll', { ttl: 300, compress: true, schema: TaskSchema })
    async getAll(@Queries() queries: any, @Request() req): Promise<Task[]> {
        Telemetry.start('TaskController::GetAll', req.requestId);
        let result = await this.taskservice.getAll(queries, req);
        Telemetry.end('TaskController::GetAll', req.requestId);
        return result;
    }

    @Get(':id')
    @Cache('task:{id}', { ttl: 300, compress: true, schema: TaskSchema })
    async getById(@Param('id') id: string, @Request() req): Promise<Task> {
        Telemetry.start('TaskController::GetById', req.requestId);
        let result = await this.taskservice.getById(id, req);
        Telemetry.end('TaskController::GetById', req.requestId);
        return result;
    }

    @Post()
    async add(@Body() item: Task, @Request() req): Promise<Task> {
        Telemetry.start('TaskController::Add', req.requestId);
        let result = await this.taskservice.add(item, req);
        CacheService.set(`task:${result.id}`, TaskSchema(result), 300);
        CacheService.del('task:getAll');
        Telemetry.end('TaskController::Add', req.requestId);
        return result;
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() item: Task,
        @Request() req,
    ): Promise<Task> {
        Telemetry.start('TaskController::Update', req.requestId);
        let result = await this.taskservice.update(id, item, req);
        CacheService.set(`task:${result.id}`, TaskSchema(result), 300);
        CacheService.del('task:getAll');
        Telemetry.end('TaskController::Update', req.requestId);
        return result;
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
        @Request() req,
    ): Promise<{ success: boolean; affected: number }> {
        Telemetry.start('TaskController::Delete', req.requestId);
        let result = await this.taskservice.delete(id, req);
        CacheService.del(`task:${id}`);
        CacheService.del('task:getAll');
        Telemetry.end('TaskController::Delete', req.requestId);
        return result;
    }
}
