/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { AbstractRepositoryService, RepositorySchema } from '@cmmv/repository';

import { Groups } from '@models/auth/groups.model';

import { GroupsEntity } from '@entities/auth/groups.entity';

export class GroupsServiceGenerated extends AbstractRepositoryService {
    protected schema = new RepositorySchema(GroupsEntity, Groups);

    async getAll(queries?: any, req?: any) {
        return await this.schema.getAll(queries, req);
    }

    async getById(id: string, req?: any) {
        return await this.schema.getById(id);
    }

    async insert(payload: Partial<Groups>, req?: any) {
        let newItem: any = this.fromPartial(Groups, payload, req);
        const validatedData = await this.validate<Groups>(newItem);
        return await this.schema.insert(validatedData);
    }

    async update(id: string, payload: Partial<Groups>, req?: any) {
        let updateItem: any = this.fromPartial(Groups, payload, req);
        const validatedData = await this.validate<Groups>(updateItem, true);
        return await this.schema.update(id, validatedData);
    }

    async delete(id: string, req?: any) {
        return await this.schema.delete(id);
    }
}
