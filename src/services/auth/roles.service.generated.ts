/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { AbstractRepositoryService, RepositorySchema } from '@cmmv/repository';

import { Roles } from '@models/auth/roles.model';

import { RolesEntity } from '@entities/auth/roles.entity';

export class RolesServiceGenerated extends AbstractRepositoryService {
    protected schema = new RepositorySchema(RolesEntity, Roles);

    async getAll(queries?: any, req?: any) {
        return await this.schema.getAll(queries, req);
    }

    async getById(id: string, req?: any) {
        return await this.schema.getById(id);
    }

    async insert(payload: Partial<Roles>, req?: any) {
        let newItem: any = this.fromPartial(Roles, payload, req);
        const validatedData = await this.validate<Roles>(newItem);
        return await this.schema.insert(validatedData);
    }

    async update(id: string, payload: Partial<Roles>, req?: any) {
        let updateItem: any = this.fromPartial(Roles, payload, req);
        const validatedData = await this.validate<Roles>(updateItem, true);
        return await this.schema.update(id, validatedData);
    }

    async delete(id: string, req?: any) {
        return await this.schema.delete(id);
    }
}
