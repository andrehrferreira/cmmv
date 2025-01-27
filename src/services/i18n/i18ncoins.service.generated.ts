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

import { I18nCoins, II18nCoins } from '../../models/i18n/i18ncoins.model';

import { I18nCoinsEntity } from '../../entities/i18n/i18ncoins.entity';

export class I18nCoinsServiceGenerated extends AbstractService {
    protected logger: Logger = new Logger('I18nCoinsServiceGenerated');

    async getAll(queries?: any, req?: any): Promise<I18nCoins[] | null> {
        try {
            Telemetry.start('I18nCoinsService::GetAll', req?.requestId);
            let result = await Repository.findAll(I18nCoinsEntity, queries);

            result = this.fixIds(result);
            Telemetry.end('I18nCoinsService::GetAll', req?.requestId);

            return result && result.length > 0
                ? result.map(item => {
                      return plainToClass(I18nCoins, item, {
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

    async getById(id: string, req?: any): Promise<I18nCoins | null> {
        try {
            Telemetry.start('I18nCoinsService::GetById', req?.requestId);
            let item = await Repository.findBy(I18nCoinsEntity, {
                _id: new ObjectId(id),
            });
            item = this.fixIds(item);
            Telemetry.end('I18nCoinsService::GetById', req?.requestId);

            if (!item) throw new Error('Item not found');

            return I18nCoins.toClass(item);
        } catch (e) {
            return null;
        }
    }

    async add(item: II18nCoins, req?: any): Promise<I18nCoins> {
        return new Promise(async (resolve, reject) => {
            try {
                Telemetry.start('I18nCoinsService::Add', req?.requestId);

                let newItem: any = plainToClass(I18nCoins, item, {
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
                    let result: any = await Repository.insert<I18nCoinsEntity>(
                        I18nCoinsEntity,
                        newItem,
                    );
                    result = this.fixIds(result);
                    Telemetry.end('TaskService::Add', req?.requestId);
                    resolve(I18nCoins.toClass(result));
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
        item: II18nCoins,
        req?: any,
    ): Promise<{ success: boolean; affected: number }> {
        return new Promise(async (resolve, reject) => {
            try {
                Telemetry.start('I18nCoinsService::Update', req?.requestId);

                let updateItem: any = plainToClass(I18nCoins, item, {
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
                        I18nCoinsEntity,
                        new ObjectId(id),
                        updateItem,
                    );
                    Telemetry.end('TaskService::Add', req?.requestId);
                    resolve({ success: result > 0, affected: result });
                }
            } catch (e) {
                console.log(e);
                Telemetry.end('I18nCoinsService::Update', req?.requestId);
                reject({ success: false, affected: 0 });
            }
        });
    }

    async delete(
        id: string,
        req?: any,
    ): Promise<{ success: boolean; affected: number }> {
        try {
            Telemetry.start('I18nCoinsService::Delete', req?.requestId);
            const result = await Repository.delete(
                I18nCoinsEntity,
                new ObjectId(id),
            );
            Telemetry.end('I18nCoinsService::Delete', req?.requestId);
            return { success: result.affected > 0, affected: result.affected };
        } catch (e) {
            Telemetry.end('I18nCoinsService::Delete', req?.requestId);
            return { success: false, affected: 0 };
        }
    }
}
