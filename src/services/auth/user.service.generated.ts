/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { AbstractRepositoryService, RepositorySchema } from '@cmmv/repository';

import { User } from '@models/auth/user.model';

import { UserEntity } from '@entities/auth/user.entity';

export class UserServiceGenerated extends AbstractRepositoryService {
    protected schema = new RepositorySchema(UserEntity, User);

    async getAll(queries?: any, req?: any) {
        return await this.schema.getAll(queries, req);
    }

    async getById(id: string, req?: any) {
        return await this.schema.getById(id);
    }

    async insert(payload: Partial<User>, req?: any) {
        let newItem: any = this.fromPartial(User, payload, req);
        const validatedData = await this.validate<User>(newItem);
        return await this.schema.insert(validatedData);
    }

    async update(id: string, payload: Partial<User>, req?: any) {
        let updateItem: any = this.fromPartial(User, payload, req);
        const validatedData = await this.validate<User>(updateItem, true);
        return await this.schema.update(id, validatedData);
    }

    async delete(id: string, req?: any) {
        return await this.schema.delete(id);
    }
}
