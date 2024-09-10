// Generated automatically by CMMV

import { Rpc, Message, Data, Socket, RpcUtils } from '@cmmv/ws';
import { plainToClass } from 'class-transformer';
import { TaskEntity } from '../entities/task.entity';
import { Cache, CacheService } from '@cmmv/cache';

import {
    AddTaskRequest,
    UpdateTaskRequest,
    DeleteTaskRequest,
} from '../protos/task';

import { TaskService } from '../services/task.service';

@Rpc('task')
export class TaskGateway {
    constructor(private readonly taskservice: TaskService) {}

    @Message('GetAllTaskRequest')
    @Cache('task:getAll', { ttl: 300, compress: true })
    async getAll(@Socket() socket) {
        try {
            const items = await this.taskservice.getAll();
            const response = await RpcUtils.pack(
                'task',
                'GetAllTaskResponse',
                items,
            );

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('AddTaskRequest')
    async add(@Data() data: AddTaskRequest, @Socket() socket) {
        try {
            const entity = plainToClass(TaskEntity, data.item);
            const result = await this.taskservice.add(entity);
            const response = await RpcUtils.pack('task', 'AddTaskResponse', {
                item: result,
                id: result.id,
            });
            CacheService.set(`task:${result.id}`, JSON.stringify(result), 300);
            CacheService.del('task:getAll');

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('UpdateTaskRequest')
    async update(@Data() data: UpdateTaskRequest, @Socket() socket) {
        try {
            const entity = plainToClass(TaskEntity, data.item);
            const result = await this.taskservice.update(data.id, entity);
            const response = await RpcUtils.pack('task', 'UpdateTaskResponse', {
                item: result,
                id: result.id,
            });
            CacheService.set(`task:${result.id}`, JSON.stringify(result), 300);
            CacheService.del('task:getAll');

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('DeleteTaskRequest')
    async delete(@Data() data: DeleteTaskRequest, @Socket() socket) {
        try {
            const result = await this.taskservice.delete(data.id);
            const response = await RpcUtils.pack('task', 'DeleteTaskResponse', {
                success: result.success,
                affected: result.affected,
                id: data.id,
            });
            CacheService.del(`task:${data.id}`);
            CacheService.del('task:getAll');

            if (response) socket.send(response);
        } catch (e) {}
    }
}
