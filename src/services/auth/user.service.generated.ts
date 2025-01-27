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

import { Telemetry, AbstractService, Logger } from '@cmmv/core';

import { Repository } from '@cmmv/repository';

import { User, IUser } from '../../models/auth/user.model';

import { UserEntity } from '../../entities/auth/user.entity';

export class UserServiceGenerated extends AbstractService {
    protected logger: Logger = new Logger('UserServiceGenerated');

    async getAll(queries?: any, req?: any): Promise<User[] | null> {
        try {
            Telemetry.start('UserService::GetAll', req?.requestId);
            let result = await Repository.findAll(UserEntity, queries);

            result = this.fixIds(result);
            Telemetry.end('UserService::GetAll', req?.requestId);

            return result && result.length > 0
                ? result.map(item => {
                      return plainToClass(User, item, {
                          exposeUnsetFields: false,
                          enableImplicitConversion: true,
                          excludeExtraneousValues: true,
                      });
                  })
                : null;
        } catch (e) {
            this.logger.error(e);
            return null;
        }
    }

    async getById(id: string, req?: any): Promise<User | null> {
        try {
            Telemetry.start('UserService::GetById', req?.requestId);
            let item = await Repository.findBy(UserEntity, {
                _id: new ObjectId(id),
            });
            item = this.fixIds(item);
            Telemetry.end('UserService::GetById', req?.requestId);

            if (!item) throw new Error('Item not found');

            return User.toClass(item);
        } catch (e) {
            return null;
        }
    }

    async add(item: IUser, req?: any): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                Telemetry.start('UserService::Add', req?.requestId);

                let newItem: any = plainToClass(User, item, {
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

                const userId: string = req.user.id;

                if (typeof userId === 'string')
                    newItem.userCreator = new ObjectId(userId);

                if (errors.length > 0) {
                    Telemetry.end('TaskService::Add', req?.requestId);
                    reject(errors);
                } else {
                    let result: any = await Repository.insert<UserEntity>(
                        UserEntity,
                        newItem,
                    );
                    result = this.fixIds(result);
                    Telemetry.end('TaskService::Add', req?.requestId);
                    resolve(User.toClass(result));
                }
            } catch (e) {
                Telemetry.end('TaskService::Add', req?.requestId);
                console.error(e);
                reject(e);
            }
        });
    }

    async update(
        id: string,
        item: IUser,
        req?: any,
    ): Promise<{ success: boolean; affected: number }> {
        return new Promise(async (resolve, reject) => {
            try {
                Telemetry.start('UserService::Update', req?.requestId);

                let updateItem: any = plainToClass(User, item, {
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
                        UserEntity,
                        new ObjectId(id),
                        updateItem,
                    );
                    Telemetry.end('TaskService::Add', req?.requestId);
                    resolve({ success: result > 0, affected: result });
                }
            } catch (e) {
                console.log(e);
                Telemetry.end('UserService::Update', req?.requestId);
                reject({ success: false, affected: 0 });
            }
        });
    }

    async delete(
        id: string,
        req?: any,
    ): Promise<{ success: boolean; affected: number }> {
        try {
            Telemetry.start('UserService::Delete', req?.requestId);
            const result = await Repository.delete(
                UserEntity,
                new ObjectId(id),
            );
            Telemetry.end('UserService::Delete', req?.requestId);
            return { success: result.affected > 0, affected: result.affected };
        } catch (e) {
            Telemetry.end('UserService::Delete', req?.requestId);
            return { success: false, affected: 0 };
        }
    }
}
