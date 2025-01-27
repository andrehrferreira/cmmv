/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { ObjectId } from 'mongodb';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Telemetry, AbstractService, Service } from '@cmmv/core';
import { Repository } from '@cmmv/repository';

import { Task, ITask } from '../models/task.model';

import { TaskEntity } from '../entities/task.entity';

export class TaskServiceGenerated extends AbstractService {
    async getAll(queries?: any, req?: any): Promise<TaskEntity[] | null> {
        try {
            Telemetry.start('TaskService::GetAll', req?.requestId);
            let result = await Repository.findAll(TaskEntity, queries);
            result = this.fixId(result);
            Telemetry.end('TaskService::GetAll', req?.requestId);
            return result;
        } catch (e) {
            return null;
        }
    }

    async getById(id: string, req?: any): Promise<TaskEntity | null> {
        try {
            Telemetry.start('TaskService::GetById', req?.requestId);
            let item = await Repository.findBy(TaskEntity, {
                _id: new ObjectId(id),
            });
            item = this.fixId(item);
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

                let newItem: any = plainToClass(Task, item, {
                    exposeUnsetFields: false,
                    enableImplicitConversion: true,
                });

                newItem = this.removeUndefined(newItem);
                delete newItem._id;

                const errors = await validate(newItem, {
                    forbidUnknownValues: false,
                    skipMissingProperties: true,
                    stopAtFirstError: true,
                });

                if (errors.length > 0) {
                    Telemetry.end('TaskService::Add', req?.requestId);
                    reject(errors);
                } else {
                    let result: any = await Repository.insert<TaskEntity>(
                        TaskEntity,
                        newItem,
                    );
                    result = this.fixId(result);
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

                let updateItem: any = plainToClass(Task, item, {
                    exposeUnsetFields: false,
                    enableImplicitConversion: true,
                });

                updateItem = this.removeUndefined(updateItem);
                delete updateItem._id;

                const errors = await validate(updateItem, {
                    forbidUnknownValues: false,
                    skipMissingProperties: true,
                    stopAtFirstError: true,
                });

                if (errors.length > 0) {
                    Telemetry.end('TaskService::Add', req?.requestId);
                    reject(errors);
                } else {
                    const result = await Repository.update(
                        TaskEntity,
                        new ObjectId(id),
                        updateItem,
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
            const result = await Repository.delete(
                TaskEntity,
                new ObjectId(id),
            );
            Telemetry.end('TaskService::Delete', req?.requestId);
            return { success: result.affected > 0, affected: result.affected };
        } catch (e) {
            return { success: false, affected: 0 };
        }
    }
}
