// Generated automatically by CMMV

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Telemetry, AbstractService, Service } from '@cmmv/core';
import { Repository } from '@cmmv/repository';
import { Task, ITask } from '../models/task.model';
import { TaskEntity } from '../entities/task.entity';

@Service('task')
export class TaskService extends AbstractService {
    public override name = 'task';

    async getAll(queries?: any, req?: any): Promise<TaskEntity[] | null> {
        try {
            Telemetry.start('TaskService::GetAll', req?.requestId);
            let result = await Repository.findAll(TaskEntity);
            Telemetry.end('TaskService::GetAll', req?.requestId);
            return result;
        } catch (e) {
            return null;
        }
    }

    async getById(id: string, req?: any): Promise<TaskEntity | null> {
        try {
            Telemetry.start('TaskService::GetById', req?.requestId);
            const item = await Repository.findBy(TaskEntity, { id });
            Telemetry.end('TaskService::GetById', req?.requestId);

            if (!item) throw new Error('Item not found');

            return item;
        } catch (e) {
            return null;
        }
    }

    async add(item: ITask, req?: any): Promise<TaskEntity> {
        return new Promise(async (resolve, reject) => {
            try {
                Telemetry.start('TaskService::Add', req?.requestId);

                const newItem = plainToClass(Task, item, {
                    exposeUnsetFields: true,
                    enableImplicitConversion: true,
                });

                const errors = await validate(newItem, {
                    skipMissingProperties: true,
                });

                if (errors.length > 0) {
                    Telemetry.end('TaskService::Add', req?.requestId);
                    reject(errors);
                } else {
                    const result = await Repository.insert<TaskEntity>(
                        TaskEntity,
                        newItem,
                    );
                    Telemetry.end('TaskService::Add', req?.requestId);
                    resolve(result);
                }
            } catch (e) {
                Telemetry.end('TaskService::Add', req?.requestId);
                console.log(e);
                reject(e);
            }
        });
    }

    async update(id: string, item: ITask, req?: any): Promise<TaskEntity> {
        return new Promise(async (resolve, reject) => {
            try {
                Telemetry.start('TaskService::Update', req?.requestId);

                const newItem = plainToClass(Task, item, {
                    exposeUnsetFields: true,
                    enableImplicitConversion: true,
                });

                const errors = await validate(newItem, {
                    skipMissingProperties: true,
                });

                if (errors.length > 0) {
                    Telemetry.end('TaskService::Add', req?.requestId);
                    reject(errors);
                } else {
                    const result = await Repository.update(
                        TaskEntity,
                        id,
                        item,
                    );
                    Telemetry.end('TaskService::Add', req?.requestId);
                    resolve(result);
                }
            } catch (e) {
                Telemetry.end('TaskService::Update', req?.requestId);
                console.log(e);
                reject(e);
            }
        });
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
        } catch (e) {
            return { success: false, affected: 0 };
        }
    }
}
