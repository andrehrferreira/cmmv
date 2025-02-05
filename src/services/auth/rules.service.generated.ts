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

import { Rules, IRules } from '../../models/auth/rules.model';

import { RulesEntity } from '../../entities/auth/rules.entity';

export class RulesServiceGenerated extends AbstractService {
    protected logger: Logger = new Logger('RulesServiceGenerated');

    async getAll(queries?: any, req?: any): Promise<Rules[] | null> {
        try {
            Telemetry.start('RulesService::GetAll', req?.requestId);
            let result = await Repository.findAll(RulesEntity, queries);

            result = this.fixIds(result);
            Telemetry.end('RulesService::GetAll', req?.requestId);

            return result && result.length > 0
                ? result.map(item => {
                      return plainToClass(Rules, item, {
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

    async getById(id: string, req?: any): Promise<Rules | null> {
        try {
            Telemetry.start('RulesService::GetById', req?.requestId);
            let item = await Repository.findBy(RulesEntity, {
                _id: new ObjectId(id),
            });
            item = this.fixIds(item);
            Telemetry.end('RulesService::GetById', req?.requestId);

            if (!item) throw new Error('Item not found');

            return Rules.toClass(item);
        } catch (e) {
            return null;
        }
    }

    async add(item: IRules, req?: any): Promise<Rules> {
        return new Promise(async (resolve, reject) => {
            try {
                Telemetry.start('RulesService::Add', req?.requestId);

                let newItem: any = plainToClass(Rules, item, {
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
                    let result: any = await Repository.insert<RulesEntity>(
                        RulesEntity,
                        newItem,
                    );
                    result = this.fixIds(result);
                    Telemetry.end('TaskService::Add', req?.requestId);
                    resolve(Rules.toClass(result));
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
        item: IRules,
        req?: any,
    ): Promise<{ success: boolean; affected: number }> {
        return new Promise(async (resolve, reject) => {
            try {
                Telemetry.start('RulesService::Update', req?.requestId);

                let updateItem: any = plainToClass(Rules, item, {
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
                        RulesEntity,
                        new ObjectId(id),
                        updateItem,
                    );
                    Telemetry.end('TaskService::Add', req?.requestId);
                    resolve({ success: result > 0, affected: result });
                }
            } catch (e) {
                console.log(e);
                Telemetry.end('RulesService::Update', req?.requestId);
                reject({ success: false, affected: 0 });
            }
        });
    }

    async delete(
        id: string,
        req?: any,
    ): Promise<{ success: boolean; affected: number }> {
        try {
            Telemetry.start('RulesService::Delete', req?.requestId);
            const result = await Repository.delete(
                RulesEntity,
                new ObjectId(id),
            );
            Telemetry.end('RulesService::Delete', req?.requestId);
            return { success: result.affected > 0, affected: result.affected };
        } catch (e) {
            Telemetry.end('RulesService::Delete', req?.requestId);
            return { success: false, affected: 0 };
        }
    }
}
