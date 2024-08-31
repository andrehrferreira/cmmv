// Generated automatically by CMMV

import { Controller, Get, Post, Put, Delete, Body, Param } from '@cmmv/http';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Controller('task')
export class TaskController {
    constructor(private readonly taskservice: TaskService) {}

    @Get()
    async getAll(): Promise<Task[]> {
        return this.taskservice.getAll();
    }

    @Post()
    async add(@Body() item: Task): Promise<Task> {
        return this.taskservice.add(item);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() item: Task): Promise<Task> {
        return this.taskservice.update(id, item);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ success: boolean }> {
        return this.taskservice.delete(id);
    }
}
