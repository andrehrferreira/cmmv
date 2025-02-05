/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { ObjectId } from 'mongodb';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { Telemetry, AbstractService, Logger } from '@cmmv/core';

import { Repository, IFindResponse } from '@cmmv/repository';

import {
    I18nCountries,
    II18nCountries,
} from '../../models/i18n/i18ncountries.model';

import { I18nCountriesEntity } from '../../entities/i18n/i18ncountries.entity';

export class I18nCountriesServiceGenerated extends AbstractService {
    protected logger: Logger = new Logger('I18nCountriesServiceGenerated');

    async getAll(queries?: any, req?: any): Promise<IFindResponse> {
        try {
            let result = await Repository.findAll(I18nCountriesEntity, queries);
            result = this.fixIds(result);

            return {
                count: result.count,
                pagination: result.pagination,
                data:
                    result && result.data.length > 0
                        ? result.data.map(item =>
                              I18nCountries.fromEntity(item),
                          )
                        : [],
            };
        } catch (e) {
            this.logger.error(e);
            return null;
        }
    }

    async getById(id: string, req?: any): Promise<IFindResponse> {
        try {
            let item = await Repository.findBy(I18nCountriesEntity, {
                _id: new ObjectId(id),
            });
            item = this.fixIds(item);

            if (!item) throw new Error('Item not found');

            return {
                count: 1,
                pagination: {
                    limit: 1,
                    offset: 0,
                    search: id,
                    searchField: 'id',
                    sortBy: 'id',
                    sort: 'asc',
                    filters: {},
                },
                data: I18nCountries.fromEntity(item.data),
            };
        } catch (e) {
            return null;
        }
    }

    async add(item: II18nCountries, req?: any): Promise<I18nCountries> {
        return new Promise(async (resolve, reject) => {
            try {
                let newItem: any = plainToInstance(I18nCountries, item, {
                    exposeUnsetFields: false,
                    enableImplicitConversion: true,
                    excludeExtraneousValues: true,
                });

                const errors = await validate(newItem, {
                    forbidUnknownValues: false,
                    stopAtFirstError: true,
                    skipMissingProperties: true,
                });

                const userId: string = req.user.id;

                if (typeof userId === 'string')
                    newItem.userCreator = new ObjectId(userId);

                if (errors.length > 0) {
                    reject({
                        success: false,
                        message: Object.values(errors[0].constraints).join(
                            ', ',
                        ),
                    });
                } else {
                    newItem = this.removeUndefined(newItem);
                    delete newItem._id;

                    const result: any =
                        await Repository.insert<I18nCountriesEntity>(
                            I18nCountriesEntity,
                            newItem,
                        );

                    if (result.success) {
                        let dataFixed = this.fixIds(result.data);
                        resolve(I18nCountries.fromEntity(dataFixed));
                    } else {
                        reject(result);
                    }
                }
            } catch (e) {
                reject({ success: false, message: e.message });
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
                let updateItem: any = plainToInstance(I18nCountries, item, {
                    exposeUnsetFields: false,
                    enableImplicitConversion: true,
                    excludeExtraneousValues: true,
                });

                const errors = await validate(updateItem, {
                    forbidUnknownValues: false,
                    skipMissingProperties: true,
                    stopAtFirstError: true,
                });

                if (errors.length > 0) {
                    reject(errors);
                } else {
                    updateItem = this.removeUndefined(updateItem);
                    delete updateItem._id;
                    const result = await Repository.update(
                        I18nCountriesEntity,
                        new ObjectId(id),
                        updateItem,
                    );
                    resolve({ success: result > 0, affected: result });
                }
            } catch (e) {
                reject({ success: false, affected: 0 });
            }
        });
    }

    async delete(
        id: string,
        req?: any,
    ): Promise<{ success: boolean; affected: number }> {
        try {
            const result = await Repository.delete(
                I18nCountriesEntity,
                new ObjectId(id),
            );
            return { success: result > 0, affected: result };
        } catch (e) {
            return { success: false, affected: 0 };
        }
    }
}
