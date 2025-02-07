import * as path from 'path';
import * as fg from 'fast-glob';
import { cwd } from 'process';

import {
    DataSource,
    Repository as TypeORMRepository,
    FindOptionsWhere,
    DeepPartial,
    Like,
    FindManyOptions,
    FindOptionsSelect,
} from 'typeorm';

import { Config, Logger, Singleton } from '@cmmv/core';

import { IFindResponse, IInsertResponse } from './repository.interface';
import { ObjectId } from 'mongodb';

export class Repository extends Singleton {
    public static logger: Logger = new Logger('Repository');
    public dataSource: DataSource;

    public static async loadConfig(): Promise<void> {
        const instance = Repository.getInstance();
        const config = Config.get('repository');

        const entitiesDir = path.resolve(cwd(), './src/entities');
        const entityFiles = await fg(`${entitiesDir}/**/*.entity.ts`);

        const entities = await Promise.all(
            entityFiles.map(async file => {
                const entityModule = await import(file);
                return Object.values(entityModule)[0];
            }),
        );

        const AppDataSource = new DataSource({
            ...config,
            entities,
        });

        instance.dataSource = await AppDataSource.initialize();
    }

    private static getRepository<Entity>(
        entity: new () => Entity,
    ): TypeORMRepository<Entity> {
        const instance = Repository.getInstance();
        return instance.dataSource.getRepository(entity);
    }

    private static getIdField(): string {
        return Config.get('repository.type') === 'mongodb' ? '_id' : 'id';
    }

    private static fixId(id: string | ObjectId): ObjectId | string {
        if (typeof id === 'string')
            return Config.get('repository.type') === 'mongodb'
                ? new ObjectId(id)
                : id;
        else
            return Config.get('repository.type') === 'mongodb'
                ? id
                : id.toString();
    }

    public static queryBuilder<Entity>(
        payload: object,
    ): FindOptionsWhere<Entity> {
        let query = {};

        for (let key in payload) {
            if (key === 'id' || key === '_id')
                query[this.getIdField()] = this.fixId(payload[key]);
            else query[key] = payload[key];
        }

        return query as FindOptionsWhere<Entity>;
    }

    public static async findBy<Entity>(
        entity: new () => Entity,
        criteria: FindOptionsWhere<Entity>,
    ): Promise<IFindResponse | null> {
        try {
            const repository = this.getRepository(entity);
            const registry = await repository.findOne({ where: criteria });

            return registry
                ? {
                      data: registry,
                      count: 1,
                      pagination: {
                          limit: 1,
                          offset: 0,
                          sortBy: 'id',
                          sort: 'ASC',
                          search: '',
                          searchField: '',
                          filters: {},
                      },
                  }
                : null;
        } catch (e) {
            if (process.env.NODE_ENV === 'dev')
                Repository.logger.error(e.message);

            return null;
        }
    }

    public static async findAll<Entity>(
        entity: new () => Entity,
        queries?: any,
        relations?: [],
    ): Promise<IFindResponse | null> {
        try {
            const isMongoDB = Config.get('repository.type') === 'mongodb';
            const repository = this.getRepository(entity);

            const {
                limit = 10,
                offset = 0,
                sortBy = 'id',
                sort = 'asc',
                search,
                searchField,
                ...filters
            } = queries || {};

            if (isMongoDB) {
                const mongoQuery: any = {};

                if (search && searchField) {
                    mongoQuery[searchField] = {
                        $regex: new RegExp(search, 'i'),
                    }; // Case-insensitive search
                }

                Object.assign(mongoQuery, filters);

                const filter = {
                    where: mongoQuery,
                    skip: parseInt(offset),
                    take: parseInt(limit), //@ts-ignore
                    order: {
                        [sortBy]: sort.toLowerCase() === 'desc' ? -1 : 1,
                    },
                } as FindManyOptions<Entity>;

                const results = await repository.find(filter);
                const total = await repository.count();

                return results
                    ? {
                          data: results,
                          count: total,
                          pagination: {
                              limit,
                              offset,
                              sortBy,
                              sort,
                              search,
                              searchField,
                              filters,
                          },
                      }
                    : null;
            } else {
                const where: FindOptionsWhere<Entity> = {};

                if (search && searchField)
                    where[searchField] = Like(`%${search}%`);

                for (const [key, value] of Object.entries(filters)) //@ts-ignore
                    where[key as keyof Entity] = value;

                const results = await repository.find({
                    where,
                    take: parseInt(limit),
                    skip: parseInt(offset), //@ts-ignore
                    order: {
                        [sortBy]:
                            sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
                    },
                });
                const total = await repository.count();

                return results
                    ? {
                          data: results,
                          count: total,
                          pagination: {
                              limit,
                              offset,
                              sortBy,
                              sort,
                              search,
                              searchField,
                              filters,
                          },
                      }
                    : null;
            }
        } catch (e) {
            return null;
        }
    }

    public static async insert<Entity>(
        entity: new () => Entity,
        data: DeepPartial<Entity>,
    ): Promise<IInsertResponse> {
        try {
            const repository = this.getRepository(entity);
            const newEntity = repository.create(data);
            return { data: await repository.save(newEntity), success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    public static async insertIfNotExists<Entity>(
        entity: new () => Entity,
        data: DeepPartial<Entity>,
        fieldFilter: string,
    ) {
        try {
            let criteria = {};
            criteria[fieldFilter] = data[fieldFilter];
            const repository = this.getRepository(entity);
            const exists = await repository.findOne({ where: criteria });

            if (!exists) {
                const newEntity = repository.create(data);
                await repository.save(newEntity);
            }
        } catch (e) {
            return false;
        }
    }

    public static async update<Entity>(
        entity: new () => Entity,
        id: any,
        data: any,
    ): Promise<number> {
        try {
            const repository = this.getRepository(entity);
            const result = await repository.update(id, data);
            return result.affected;
        } catch (e) {
            console.log(e);
            return 0;
        }
    }

    public static async updateOne<Entity>(
        entity: new () => Entity,
        criteria: FindOptionsWhere<Entity>,
        data: Partial<Entity>,
    ) {
        try {
            const repository = this.getRepository(entity);
            const existingRecord = await repository.findOne({
                where: criteria,
            });

            if (!existingRecord) return false;

            Object.assign(existingRecord, data);
            await repository.save(existingRecord);
            return true;
        } catch (e) {
            return false;
        }
    }

    public static async updateById<Entity>(
        entity: new () => Entity,
        id: any,
        data: Partial<Entity>,
    ) {
        try {
            const repository = this.getRepository(entity);
            const query = {
                [this.getIdField()]: this.fixId(id),
            } as FindOptionsWhere<Entity>;

            const existingRecord = await repository.findOne({
                where: query,
                select: {
                    [this.getIdField()]: true,
                } as FindOptionsSelect<Entity>,
            });

            if (!existingRecord) return false;

            Object.assign(existingRecord, data);
            await repository.save(existingRecord);
            return true;
        } catch (e) {
            return false;
        }
    }

    public static async delete<Entity>(
        entity: new () => Entity,
        id: any,
    ): Promise<number> {
        try {
            const repository = this.getRepository(entity);
            const result = await repository.delete(id);
            return result.affected;
        } catch (e) {
            return 0;
        }
    }

    public static async exists<Entity>(
        entity: new () => Entity,
        criteria: FindOptionsWhere<Entity>,
    ): Promise<boolean> {
        try {
            const repository = this.getRepository(entity);

            const result = await repository.findOne({
                where: criteria,
                select: {
                    [this.getIdField()]: true,
                } as FindOptionsSelect<Entity>,
            });

            return result !== null;
        } catch (e) {
            return false;
        }
    }
}
