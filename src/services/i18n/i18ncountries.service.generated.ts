/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { AbstractRepositoryService, RepositorySchema } from '@cmmv/repository';

import { I18nCountries } from '@models/i18n/i18ncountries.model';

import { I18nCountriesEntity } from '@entities/i18n/i18ncountries.entity';

export class I18nCountriesServiceGenerated extends AbstractRepositoryService {
    protected schema = new RepositorySchema(I18nCountriesEntity, I18nCountries);

    async getAll(queries?: any, req?: any) {
        return await this.schema.getAll(queries, req);
    }

    async getById(id: string, req?: any) {
        return await this.schema.getById(id);
    }

    async insert(payload: Partial<I18nCountries>, req?: any) {
        let newItem: any = this.fromPartial(I18nCountries, payload, req);
        const validatedData = await this.validate<I18nCountries>(newItem);
        return await this.schema.insert(validatedData);
    }

    async update(id: string, payload: Partial<I18nCountries>, req?: any) {
        let updateItem: any = this.fromPartial(I18nCountries, payload, req);
        const validatedData = await this.validate<I18nCountries>(
            updateItem,
            true,
        );
        return await this.schema.update(id, validatedData);
    }

    async delete(id: string, req?: any) {
        return await this.schema.delete(id);
    }
}
