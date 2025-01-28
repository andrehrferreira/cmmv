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

import { Roles, IRoles } from '../../models/auth/roles.model';

import { RolesEntity } from '../../entities/auth/roles.entity';

export class RolesServiceGenerated extends AbstractService {
    protected logger: Logger = new Logger('RolesServiceGenerated');

    async getAll(queries?: any, req?: any): Promise<Roles[] | null> {
        try {
            Telemetry.start('RolesService::GetAll', req?.requestId);
            let result = await Repository.findAll(RolesEntity, queries);

            result = this.fixIds(result);
            Telemetry.end('RolesService::GetAll', req?.requestId);

            return result && result.length > 0
                ? result.map(item => {
                      return plainToClass(Roles, item, {
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

    async getById(id: string, req?: any): Promise<Roles | null> {
        try {
            Telemetry.start('RolesService::GetById', req?.requestId);
            let item = await Repository.findBy(RolesEntity, {
                _id: new ObjectId(id),
            });
            item = this.fixIds(item);
            Telemetry.end('RolesService::GetById', req?.requestId);

            if (!item) throw new Error('Item not found');

            return Roles.toClass(item);
        } catch (e) {
            return null;
        }
    }

    async add(item: IRoles, req?: any): Promise<Roles> {
        return new Promise(async (resolve, reject) => {
            try {
                Telemetry.start('RolesService::Add', req?.requestId);

                let newItem: any = plainToClass(Roles, item, {
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
                    let result: any = await Repository.insert<RolesEntity>(
                        RolesEntity,
                        newItem,
                    );
                    result = this.fixIds(result);
                    Telemetry.end('TaskService::Add', req?.requestId);
                    resolve(Roles.toClass(result));
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
        item: IRoles,
        req?: any,
    ): Promise<{ success: boolean; affected: number }> {
        return new Promise(async (resolve, reject) => {
            try {
                Telemetry.start('RolesService::Update', req?.requestId);

                let updateItem: any = plainToClass(Roles, item, {
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
                        RolesEntity,
                        new ObjectId(id),
                        updateItem,
                    );
                    Telemetry.end('TaskService::Add', req?.requestId);
                    resolve({ success: result > 0, affected: result });
                }
            } catch (e) {
                console.log(e);
                Telemetry.end('RolesService::Update', req?.requestId);
                reject({ success: false, affected: 0 });
            }
        });
    }

    async delete(
        id: string,
        req?: any,
    ): Promise<{ success: boolean; affected: number }> {
        try {
            Telemetry.start('RolesService::Delete', req?.requestId);
            const result = await Repository.delete(
                RolesEntity,
                new ObjectId(id),
            );
            Telemetry.end('RolesService::Delete', req?.requestId);
            return { success: result.affected > 0, affected: result.affected };
        } catch (e) {
            Telemetry.end('RolesService::Delete', req?.requestId);
            return { success: false, affected: 0 };
        }
    }
}
