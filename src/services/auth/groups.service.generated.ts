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

import { Groups, IGroups } from '../../models/auth/groups.model';

import { GroupsEntity } from '../../entities/auth/groups.entity';

export class GroupsServiceGenerated extends AbstractRepositoryService {
    protected logger: Logger = new Logger('GroupsServiceGenerated');

    async getAll(queries?: any, req?: any): Promise<IFindResponse> {
        try {
            let result = await Repository.findAll(GroupsEntity, queries);
            result = this.fixIds(result);

            return {
                count: result.count,
                pagination: result.pagination,
                data:
                    result && result.data.length > 0
                        ? result.data.map(item => Groups.fromEntity(item))
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
            let item = await Repository.findBy(GroupsEntity, {
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
                data: Groups.fromEntity(item.data),
            };
        } catch (e) {
            return null;
        }
    }

    async insert(item: Partial<Groups>, req?: any): Promise<Groups> {
        return new Promise(async (resolve, reject) => {
            try {
                let newItem: any = Groups.fromPartial(item);
                const userId: string = req.user?.id;

                if (typeof userId === 'string') {
                    try {
                        newItem.userCreator = new ObjectId(userId);
                    } catch {}
                }

                this.validate(newItem)
                    .then(async (data: any) => {
                        const result: any =
                            await Repository.insert<GroupsEntity>(
                                GroupsEntity,
                                newItem,
                            );

                        if (result.success) {
                            let dataFixed = this.fixIds(result.data);
                            resolve(Groups.fromEntity(dataFixed));
                        } else {
                            reject(result);
                        }
                    })
                    .catch(error => {
                        reject({ success: false, message: error.message });
                    });
            } catch (e) {
                reject({ success: false, message: e.message });
            }
        });
    }

    async update(
        id: string,
        item: Partial<Groups>,
        req?: any,
    ): Promise<{ success: boolean; affected: number }> {
        return new Promise(async (resolve, reject) => {
            try {
                let updateItem: any = Groups.fromPartial(item);

                this.validate(updateItem)
                    .then(async (data: any) => {
                        const userId: string = req.user?.id;

                        if (typeof userId === 'string') {
                            try {
                                data.userLastUpdate = new ObjectId(userId);
                            } catch {}
                        }

                        const result = await Repository.update(
                            GroupsEntity,
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
                GroupsEntity,
                new ObjectId(id),
            );

            return { success: result > 0, affected: result };
        } catch (e) {
            return { success: false, affected: 0 };
        }
    }
}
