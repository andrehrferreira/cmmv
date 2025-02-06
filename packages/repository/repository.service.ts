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
} from 'typeorm';

import { Config, Logger, Singleton } from '@cmmv/core';

import { IFindResponse, IInsertResponse } from './repository.interface';

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

    public static async findBy<Entity>(
        entity: new () => Entity,
        criteria: FindOptionsWhere<Entity>,
    ): Promise<IFindResponse> {
        try {
            const repository = this.getRepository(entity);
            return { data: await repository.findOne({ where: criteria }) };
        } catch (e) {
            if (process.env.NODE_ENV === 'dev')
                Repository.logger.error(e.message);

            return { data: [] };
        }
    }

    public static async findAll<Entity>(
        entity: new () => Entity,
        queries?: any,
        relations?: [],
    ): Promise<IFindResponse> {
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

                return {
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
                };
            } else {
                const where: FindOptionsWhere<Entity> = {};

                if (search && searchField)
                    where[searchField] = Like(`%${search}%`);

                for (const [key, value] of Object.entries(filters)) //@ts-ignore
                    where[key as keyof Entity] = value;

                const filter = {
                    where,
                    take: parseInt(limit),
                    skip: parseInt(offset), //@ts-ignore
                    order: {
                        [sortBy]:
                            sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
                    },
                } as FindManyOptions<Entity>;

                console.log(filter);

                const results = await repository.find(filter);
                const total = await repository.count(filter);

                return {
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
                };
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
            return 0;
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
}
