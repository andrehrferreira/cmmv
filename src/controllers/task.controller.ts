// Generated automatically by CMMV
    
import { Telemetry } from "@cmmv/core";  
import { Controller, Get, Post, Put, Delete, Queries, Param, Body, Request } from '@cmmv/http';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Controller('task')
export class TaskController {
    constructor(private readonly taskservice: TaskService) {}

    @Get()
    async getAll(@Queries() queries: any, @Request() req): Promise<Task[]> {
        Telemetry.start('Controller Get All', req.requestId);
        let result = await this.taskservice.getAll(queries, req);
        Telemetry.end('Controller Get All', req.requestId);
        return result;
    }

    @Get(':id')
    async getById(@Param('id') id: string, @Request() req): Promise<Task> {
        Telemetry.start('Controller Get By Id', req.requestId);
        let result = await this.taskservice.getById(id, req);
        Telemetry.end('Controller Get By Id', req.requestId);
        return result;
    }

    @Post()
    async add(@Body() item: Task, @Request() req): Promise<Task> {
        Telemetry.start('Controller Add', req.requestId);
        let result = await this.taskservice.add(item, req);
        Telemetry.end('Controller Add', req.requestId);
        return result;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() item: Task, @Request() req): Promise<Task> {
        Telemetry.start('Controller Update', req.requestId);
        let result = await this.taskservice.update(id, item, req);
        Telemetry.end('Controller Update', req.requestId);
        return result;
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Request() req): Promise<{ success: boolean }> {
        Telemetry.start('Controller Delete', req.requestId);
        let result = await this.taskservice.delete(id, req);
        Telemetry.end('Controller Delete', req.requestId);
        return result;
    }
}
