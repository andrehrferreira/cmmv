// Generated automatically by CMMV

import { classToPlain, plainToClass } from 'class-transformer';
import { Telemetry } from '@cmmv/core';
import { AbstractService, Service } from '@cmmv/http';
import { Repository } from '@cmmv/repository';
import { TaskEntity } from '../entities/task.entity';

@Service('task')
export class TaskService extends AbstractService {
    public override name = 'task';

    async getAll(queries?: any, req?: any): Promise<TaskEntity[]> {
        try {
            Telemetry.start('TaskService::GetAll', req?.requestId);
            let result = await Repository.findAll(TaskEntity);
            Telemetry.end('TaskService::GetAll', req?.requestId);
            return result;
        } catch (e) {}
    }

    async getById(id: string, req?: any): Promise<TaskEntity> {
        try {
            Telemetry.start('TaskService::GetById', req?.requestId);
            const item = await Repository.findBy(TaskEntity, { id });
            Telemetry.end('TaskService::GetById', req?.requestId);

            if (!item) throw new Error('Item not found');

            return item;
        } catch (e) {}
    }

    async add(item: Partial<TaskEntity>, req?: any): Promise<TaskEntity> {
        try {
            Telemetry.start('TaskService::Add', req?.requestId);
            const result = await Repository.insert<TaskEntity>(
                TaskEntity,
                item,
            );
            Telemetry.end('TaskService::Add', req?.requestId);
            return result;
        } catch (e) {}
    }

    async update(
        id: string,
        item: Partial<TaskEntity>,
        req?: any,
    ): Promise<TaskEntity> {
        try {
            Telemetry.start('TaskService::Update', req?.requestId);
            const result = await Repository.update(TaskEntity, id, item);
            Telemetry.end('TaskService::Update', req?.requestId);
            return result;
        } catch (e) {}
    }

    async delete(
        id: string,
        req?: any,
    ): Promise<{ success: boolean; affected: number }> {
        try {
            Telemetry.start('TaskService::Delete', req?.requestId);
            const result = await Repository.delete(TaskEntity, id);
            Telemetry.end('TaskService::Delete', req?.requestId);
            return { success: result.affected > 0, affected: result.affected };
        } catch (e) {}
    }
}
