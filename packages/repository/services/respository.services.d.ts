import { DataSource, FindOptionsWhere, DeepPartial, DeleteResult } from 'typeorm';
import { Logger, Singleton } from '@cmmv/core';
export declare class Repository extends Singleton {
    static logger: Logger;
    dataSource: DataSource;
    static loadConfig(): Promise<void>;
    private static getRepository;
    static findBy<Entity>(entity: new () => Entity, criteria: FindOptionsWhere<Entity>): Promise<Entity | null>;
    static findOneBy<Entity>(entity: new () => Entity, criteria: FindOptionsWhere<Entity>): Promise<Entity | null>;
    static findAll<Entity>(entity: new () => Entity): Promise<Entity[]>;
    static insert<Entity>(entity: new () => Entity, data: DeepPartial<Entity>): Promise<Entity>;
    static update<Entity>(entity: new () => Entity, id: any, data: any): Promise<Entity | null>;
    static delete<Entity>(entity: new () => Entity, id: any): Promise<DeleteResult>;
}
