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

import {
    I18nCountries,
    II18nCountries,
} from '../../models/i18n/i18ncountries.model';

import { I18nCountriesEntity } from '../../entities/i18n/i18ncountries.entity';

export class I18nCountriesServiceGenerated extends AbstractService {
    protected logger: Logger = new Logger('I18nCountriesServiceGenerated');

    async getAll(queries?: any, req?: any): Promise<I18nCountries[] | null> {
        try {
            Telemetry.start('I18nCountriesService::GetAll', req?.requestId);
            let result = await Repository.findAll(I18nCountriesEntity, queries);

            result = this.fixIds(result);
            Telemetry.end('I18nCountriesService::GetAll', req?.requestId);

            return result && result.length > 0
                ? result.map(item => {
                      return plainToClass(I18nCountries, item, {
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

    async getById(id: string, req?: any): Promise<I18nCountries | null> {
        try {
            Telemetry.start('I18nCountriesService::GetById', req?.requestId);
            let item = await Repository.findBy(I18nCountriesEntity, {
                _id: new ObjectId(id),
            });
            item = this.fixIds(item);
            Telemetry.end('I18nCountriesService::GetById', req?.requestId);

            if (!item) throw new Error('Item not found');

            return I18nCountries.toClass(item);
        } catch (e) {
            return null;
        }
    }

    async add(item: II18nCountries, req?: any): Promise<I18nCountries> {
        return new Promise(async (resolve, reject) => {
            try {
                Telemetry.start('I18nCountriesService::Add', req?.requestId);

                let newItem: any = plainToClass(I18nCountries, item, {
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
                    let result: any =
                        await Repository.insert<I18nCountriesEntity>(
                            I18nCountriesEntity,
                            newItem,
                        );
                    result = this.fixIds(result);
                    Telemetry.end('TaskService::Add', req?.requestId);
                    resolve(I18nCountries.toClass(result));
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
        item: II18nCountries,
        req?: any,
    ): Promise<{ success: boolean; affected: number }> {
        return new Promise(async (resolve, reject) => {
            try {
                Telemetry.start('I18nCountriesService::Update', req?.requestId);

                let updateItem: any = plainToClass(I18nCountries, item, {
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
                        I18nCountriesEntity,
                        new ObjectId(id),
                        updateItem,
                    );
                    Telemetry.end('TaskService::Add', req?.requestId);
                    resolve({ success: result > 0, affected: result });
                }
            } catch (e) {
                console.log(e);
                Telemetry.end('I18nCountriesService::Update', req?.requestId);
                reject({ success: false, affected: 0 });
            }
        });
    }

    async delete(
        id: string,
        req?: any,
    ): Promise<{ success: boolean; affected: number }> {
        try {
            Telemetry.start('I18nCountriesService::Delete', req?.requestId);
            const result = await Repository.delete(
                I18nCountriesEntity,
                new ObjectId(id),
            );
            Telemetry.end('I18nCountriesService::Delete', req?.requestId);
            return { success: result.affected > 0, affected: result.affected };
        } catch (e) {
            Telemetry.end('I18nCountriesService::Delete', req?.requestId);
            return { success: false, affected: 0 };
        }
    }
}
