/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { AbstractRepositoryService, RepositorySchema } from '@cmmv/repository';

import { I18nCoins } from '@models/i18n/i18ncoins.model';

import { I18nCoinsEntity } from '@entities/i18n/i18ncoins.entity';

export class I18nCoinsServiceGenerated extends AbstractRepositoryService {
    protected schema = new RepositorySchema(I18nCoinsEntity, I18nCoins);

    async getAll(queries?: any, req?: any) {
        return await this.schema.getAll(queries, req);
    }

    async getById(id: string, req?: any) {
        return await this.schema.getById(id);
    }

    async insert(payload: Partial<I18nCoins>, req?: any) {
        let newItem: any = this.fromPartial(I18nCoins, payload, req);
        const validatedData = await this.validate<I18nCoins>(newItem);
        return await this.schema.insert(validatedData);
    }

    async update(id: string, payload: Partial<I18nCoins>, req?: any) {
        let updateItem: any = this.fromPartial(I18nCoins, payload, req);
        const validatedData = await this.validate<I18nCoins>(updateItem, true);
        return await this.schema.update(id, validatedData);
    }

    async delete(id: string, req?: any) {
        return await this.schema.delete(id);
    }
}
