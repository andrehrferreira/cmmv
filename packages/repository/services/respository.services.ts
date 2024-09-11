import * as path from 'path';
import * as fg from 'fast-glob';
import { cwd } from 'process';

import {
    DataSource,
    Repository as TypeORMRepository,
    FindOptionsWhere,
    DeepPartial,
    DeleteResult,
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

    public static async findOneBy<Entity>(
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
    ): Promise<Entity[]> {
        try {
            const repository = this.getRepository(entity);
            return await repository.find();
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
    ): Promise<Entity | null> {
        try {
            const repository = this.getRepository(entity);
            await repository.update(id, data);
            return await this.findOneBy(entity, {
                id,
            } as FindOptionsWhere<Entity>);
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
