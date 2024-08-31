import * as path from 'path';
import * as fg from 'fast-glob';
import { cwd } from 'process';

import { 
    DataSource, Repository as TypeORMRepository, 
    FindOptionsWhere, DeepPartial 
} from 'typeorm';

import { Config, Singleton } from '@cmmv/core';

export class Repository extends Singleton {
    public dataSource: DataSource;

    public static async loadConfig(): Promise<void> {
        const instance = Repository.getInstance();
        const config = Config.get("repository");

        const entitiesDir = path.resolve(cwd(), './src/entities');
        const entityFiles = await fg(`${entitiesDir}/**/*.entity.ts`);

        const entities = await Promise.all(
            entityFiles.map(async (file) => {
                const entityModule = await import(file);
                return Object.values(entityModule)[0];
            })
        );

        const AppDataSource = new DataSource({
            ...config,
            entities,
        });

        instance.dataSource = await AppDataSource.initialize();
    }

    private static getRepository<Entity>(entity: new () => Entity): TypeORMRepository<Entity> {
        const instance = Repository.getInstance();
        return instance.dataSource.getRepository(entity);
    }

    public static async findBy<Entity>(entity: new () => Entity, criteria: FindOptionsWhere<Entity>): Promise<Entity[]> {
        const repository = this.getRepository(entity);
        return repository.find({ where: criteria });
    }

    public static async findOneBy<Entity>(entity: new () => Entity, criteria: FindOptionsWhere<Entity>): Promise<Entity | null> {
        const repository = this.getRepository(entity);
        return repository.findOne({ where: criteria });
    }
    
    public static async findAll<Entity>(entity: new () => Entity): Promise<Entity[]> {
        const repository = this.getRepository(entity);
        return repository.find();
    }

    public static async insert<Entity>(entity: new () => Entity, data: DeepPartial<Entity>): Promise<Entity> {
        const repository = this.getRepository(entity);
        const newEntity = repository.create(data);
        return repository.save(newEntity);
    }

    public static async update<Entity>(entity: new () => Entity, id: any, data: any): Promise<Entity | null> {
        const repository = this.getRepository(entity);
        await repository.update(id, data);
        return this.findOneBy(entity, { id } as FindOptionsWhere<Entity>);
    }

    public static async delete<Entity>(entity: new () => Entity, id: any): Promise<void> {
        const repository = this.getRepository(entity);
        await repository.delete(id);
    }
}
