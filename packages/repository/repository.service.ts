import * as path from 'path';
import * as fg from 'fast-glob';
import { cwd } from 'process';

import {
    DataSource,
    Repository as TypeORMRepository,
    FindOptionsWhere,
    DeepPartial,
    DeleteResult,
    Like,
} from 'typeorm';

import { Config, Logger, Singleton } from '@cmmv/core';

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
    ): Promise<Entity | null> {
        try {
            const repository = this.getRepository(entity);
            return await repository.findOne({ where: criteria });
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
    ): Promise<Entity[]> {
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

                const results = await repository.find({
                    where: mongoQuery,
                    skip: parseInt(offset),
                    take: parseInt(limit), //@ts-ignore
                    order: {
                        [sortBy]: sort.toLowerCase() === 'desc' ? -1 : 1,
                    },
                });

                return results;
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

                return results;
            }
        } catch (e) {
            if (process.env.NODE_ENV === 'dev')
                Repository.logger.error(e.message);

            return null;
        }
    }

    public static async insert<Entity>(
        entity: new () => Entity,
        data: DeepPartial<Entity>,
    ): Promise<Entity> {
        try {
            const repository = this.getRepository(entity);
            const newEntity = repository.create(data);
            return await repository.save(newEntity);
        } catch (e) {
            if (process.env.NODE_ENV === 'dev')
                Repository.logger.error(e.message);

            return null;
        }
    }

    public static async update<Entity>(
        entity: new () => Entity,
        id: any,
        data: any,
    ): Promise<number | null> {
        try {
            const repository = this.getRepository(entity);
            const result = await repository.update(id, data);
            return result.affected;
        } catch (e) {
            if (process.env.NODE_ENV === 'dev')
                Repository.logger.error(e.message);

            return null;
        }
    }

    public static async delete<Entity>(
        entity: new () => Entity,
        id: any,
    ): Promise<DeleteResult> {
        try {
            const repository = this.getRepository(entity);
            const result = await repository.delete(id);
            return result;
        } catch (e) {
            if (process.env.NODE_ENV === 'dev')
                Repository.logger.error(e.message);

            return null;
        }
    }
}
