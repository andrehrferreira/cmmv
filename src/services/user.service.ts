// Generated automatically by CMMV

import { validate } from 'class-validator';
import { classToPlain, plainToClass } from 'class-transformer';
import { Telemetry } from '@cmmv/core';
import { AbstractService, Service } from '@cmmv/http';
import { Repository } from '@cmmv/repository';
import { User, IUser } from '../models/user.model';
import { UserEntity } from '../entities/user.entity';

@Service('user')
export class UserService extends AbstractService {
    public override name = 'user';

    async getAll(queries?: any, req?: any): Promise<UserEntity[] | null> {
        try {
            Telemetry.start('UserService::GetAll', req?.requestId);
            let result = await Repository.findAll(UserEntity);
            Telemetry.end('UserService::GetAll', req?.requestId);
            return result;
        } catch (e) {
            return null;
        }
    }

    async getById(id: string, req?: any): Promise<UserEntity | null> {
        try {
            Telemetry.start('UserService::GetById', req?.requestId);
            const item = await Repository.findBy(UserEntity, { id });
            Telemetry.end('UserService::GetById', req?.requestId);

            if (!item) throw new Error('Item not found');

            return item;
        } catch (e) {
            return null;
        }
    }

    async add(item: IUser, req?: any): Promise<UserEntity> {
        return new Promise(async (resolve, reject) => {
            try {
                Telemetry.start('UserService::Add', req?.requestId);

                const newItem = plainToClass(User, item, {
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
                    const result = await Repository.insert<UserEntity>(
                        UserEntity,
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

    async update(id: string, item: IUser, req?: any): Promise<UserEntity> {
        return new Promise(async (resolve, reject) => {
            try {
                Telemetry.start('UserService::Update', req?.requestId);

                const newItem = plainToClass(User, item, {
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
                        UserEntity,
                        id,
                        item,
                    );
                    Telemetry.end('TaskService::Add', req?.requestId);
                    resolve(result);
                }
            } catch (e) {
                Telemetry.end('UserService::Update', req?.requestId);
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
            Telemetry.start('UserService::Delete', req?.requestId);
            const result = await Repository.delete(UserEntity, id);
            Telemetry.end('UserService::Delete', req?.requestId);
            return { success: result.affected > 0, affected: result.affected };
        } catch (e) {
            return { success: false, affected: 0 };
        }
    }
}
