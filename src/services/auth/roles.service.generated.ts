/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { ObjectId } from 'mongodb';
import { validate } from 'class-validator';

import { Telemetry, Logger } from '@cmmv/core';

import {
    Repository,
    IFindResponse,
    AbstractRepositoryService,
} from '@cmmv/repository';

import { Roles, IRoles } from '@models/auth/roles.model';

import { RolesEntity } from '@entities/auth/roles.entity';

export class RolesServiceGenerated extends AbstractRepositoryService {
    protected logger: Logger = new Logger('RolesServiceGenerated');

    async getAll(queries?: any, req?: any): Promise<IFindResponse> {
        try {
            let result = await Repository.findAll(RolesEntity, queries);
            result = this.fixIds(result);

            if (!result) throw new Error('Unable to return a valid result.');

            return {
                count: result.count,
                pagination: result.pagination,
                data:
                    result && result.data.length > 0
                        ? result.data.map(item => Roles.fromEntity(item))
                        : [],
            };
        } catch (e) {
            console.log(e);
            this.logger.error(e);
            return null;
        }
    }

    async getById(id: string, req?: any): Promise<IFindResponse> {
        try {
            let result = await Repository.findBy(RolesEntity, {
                _id: new ObjectId(id),
            });
            result = this.fixIds(result);

            if (!result) throw new Error('Unable to return a valid result.');

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
                data: Roles.fromEntity(result.data),
            };
        } catch (e) {
            return null;
        }
    }

    async insert(item: Partial<Roles>, req?: any): Promise<Roles> {
        try {
            let newItem: any = this.extraData(Roles.fromPartial(item), req);
            const validatedData = await this.validate(newItem);
            const result: any = await Repository.insert<RolesEntity>(
                RolesEntity,
                validatedData,
            );

            if (!result.success)
                throw new Error(result.message || 'Insert operation failed');

            const dataFixed = this.fixIds(result.data);
            return Roles.fromEntity(dataFixed);
        } catch (error) {
            throw new Error(error.message || 'Error inserting item');
        }
    }

    async update(
        id: string,
        item: Partial<Roles>,
        req?: any,
    ): Promise<{ success: boolean; affected: number }> {
        return new Promise(async (resolve, reject) => {
            try {
                let updateItem: any = Roles.fromPartial(item);

                this.validate(updateItem)
                    .then(async (data: any) => {
                        const userId: string = req.user?.id;

                        if (typeof userId === 'string') {
                            try {
                                data.userLastUpdate = new ObjectId(userId);
                            } catch {}
                        }

                        const result = await Repository.update(
                            RolesEntity,
                            new ObjectId(id),
                            {
                                ...data,
                                updatedAt: new Date(),
                            },
                        );

                        resolve({ success: result > 0, affected: result });
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error);
                    });
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
                RolesEntity,
                new ObjectId(id),
            );

            return { success: result > 0, affected: result };
        } catch (e) {
            return { success: false, affected: 0 };
        }
    }
}
