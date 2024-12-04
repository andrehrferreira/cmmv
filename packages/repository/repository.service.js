"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const path = require("path");
const fg = require("fast-glob");
const process_1 = require("process");
const typeorm_1 = require("typeorm");
const core_1 = require("@cmmv/core");
class Repository extends core_1.Singleton {
    static async loadConfig() {
        const instance = Repository.getInstance();
        const config = core_1.Config.get('repository');
        const entitiesDir = path.resolve((0, process_1.cwd)(), './src/entities');
        const entityFiles = await fg(`${entitiesDir}/**/*.entity.ts`);
        const entities = await Promise.all(entityFiles.map(async (file) => {
            const entityModule = await Promise.resolve(`${file}`).then(s => require(s));
            return Object.values(entityModule)[0];
        }));
        const AppDataSource = new typeorm_1.DataSource({
            ...config,
            entities,
        });
        instance.dataSource = await AppDataSource.initialize();
    }
    static getRepository(entity) {
        const instance = Repository.getInstance();
        return instance.dataSource.getRepository(entity);
    }
    static async findBy(entity, criteria) {
        try {
            const repository = this.getRepository(entity);
            return await repository.findOne({ where: criteria });
        }
        catch (e) {
            if (process.env.NODE_ENV === 'dev')
                Repository.logger.error(e.message);
            return null;
        }
    }
    static async findOneBy(entity, criteria) {
        try {
            const repository = this.getRepository(entity);
            return await repository.findOne({ where: criteria });
        }
        catch (e) {
            if (process.env.NODE_ENV === 'dev')
                Repository.logger.error(e.message);
            return null;
        }
    }
    static async findAll(entity, queries) {
        try {
            const isMongoDB = core_1.Config.get('repository.type') === 'mongodb';
            const repository = this.getRepository(entity);
            const { limit = 10, offset = 0, sortBy = 'id', sort = 'asc', search, searchField, ...filters } = queries || {};
            if (isMongoDB) {
                const mongoQuery = {};
                if (search && searchField)
                    mongoQuery[searchField] = {
                        $regex: new RegExp(search, 'i'),
                    }; // Case-insensitive search
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
            }
            else {
                const where = {};
                if (search && searchField)
                    where[searchField] = (0, typeorm_1.Like)(`%${search}%`);
                for (const [key, value] of Object.entries(filters)) //@ts-ignore
                    where[key] = value;
                const results = await repository.find({
                    where,
                    take: parseInt(limit),
                    skip: parseInt(offset), //@ts-ignore
                    order: {
                        [sortBy]: sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
                    },
                });
                return results;
            }
        }
        catch (e) {
            if (process.env.NODE_ENV === 'dev')
                Repository.logger.error(e.message);
            return null;
        }
    }
    static async insert(entity, data) {
        try {
            const repository = this.getRepository(entity);
            const newEntity = repository.create(data);
            return await repository.save(newEntity);
        }
        catch (e) {
            if (process.env.NODE_ENV === 'dev')
                Repository.logger.error(e.message);
            return null;
        }
    }
    static async update(entity, id, data) {
        try {
            const repository = this.getRepository(entity);
            await repository.update(id, data);
            return await this.findOneBy(entity, {
                id,
            });
        }
        catch (e) {
            if (process.env.NODE_ENV === 'dev')
                Repository.logger.error(e.message);
            return null;
        }
    }
    static async delete(entity, id) {
        try {
            const repository = this.getRepository(entity);
            const result = await repository.delete(id);
            return result;
        }
        catch (e) {
            if (process.env.NODE_ENV === 'dev')
                Repository.logger.error(e.message);
            return null;
        }
    }
}
exports.Repository = Repository;
Repository.logger = new core_1.Logger('Repository');
