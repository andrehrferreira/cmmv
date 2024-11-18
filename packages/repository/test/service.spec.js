"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const sinon = require("sinon");
const typeorm_1 = require("typeorm");
const respository_services_1 = require("../services/respository.services");
(0, vitest_1.describe)('Repository', () => {
    let sandbox;
    let dataSourceStub;
    let repositoryStub;
    (0, vitest_1.beforeEach)(() => {
        sandbox = sinon.createSandbox();
        // Mock the data source and repository
        dataSourceStub = sandbox.createStubInstance(typeorm_1.DataSource);
        repositoryStub = sandbox.createStubInstance(typeorm_1.Repository);
        respository_services_1.Repository.getInstance().dataSource =
            dataSourceStub;
        dataSourceStub.getRepository.returns(repositoryStub);
    });
    (0, vitest_1.afterEach)(() => {
        sandbox.restore();
    });
    (0, vitest_1.describe)('getRepository', () => {
        (0, vitest_1.it)('should return the TypeORM repository for a given entity', () => {
            class TestEntity {
            }
            const repository = respository_services_1.Repository['getRepository'](TestEntity);
            (0, vitest_1.expect)(dataSourceStub.getRepository.calledOnceWithExactly(TestEntity)).toBe(true);
        });
    });
    (0, vitest_1.describe)('findBy', () => {
        (0, vitest_1.it)('should find an entity by criteria', async () => {
            class TestEntity {
            }
            const criteria = { id: 1 };
            repositoryStub.findOne.resolves(new TestEntity());
            const result = await respository_services_1.Repository.findBy(TestEntity, criteria);
            (0, vitest_1.expect)(repositoryStub.findOne.calledOnce).toBe(true);
            (0, vitest_1.expect)(result instanceof TestEntity).toBe(true);
        });
        (0, vitest_1.it)('should return null if find operation fails', async () => {
            class TestEntity {
            }
            repositoryStub.findOne.rejects(new Error('Find error'));
            const result = await respository_services_1.Repository.findBy(TestEntity, {});
            (0, vitest_1.expect)(result).toBeNull();
        });
    });
    (0, vitest_1.describe)('findOneBy', () => {
        (0, vitest_1.it)('should find one entity by criteria', async () => {
            class TestEntity {
            }
            const criteria = { id: 1 };
            repositoryStub.findOne.resolves(new TestEntity());
            const result = await respository_services_1.Repository.findOneBy(TestEntity, criteria);
            (0, vitest_1.expect)(repositoryStub.findOne.calledOnce).toBe(true);
            (0, vitest_1.expect)(result instanceof TestEntity).toBe(true);
        });
        (0, vitest_1.it)('should return null if find operation fails', async () => {
            class TestEntity {
            }
            repositoryStub.findOne.rejects(new Error('Find error'));
            const result = await respository_services_1.Repository.findOneBy(TestEntity, {});
            (0, vitest_1.expect)(result).toBeNull();
        });
    });
    (0, vitest_1.describe)('findAll', () => {
        (0, vitest_1.it)('should find all entities', async () => {
            class TestEntity {
            }
            const entities = [new TestEntity(), new TestEntity()];
            repositoryStub.find.resolves(entities);
            const result = await respository_services_1.Repository.findAll(TestEntity);
            (0, vitest_1.expect)(repositoryStub.find.calledOnce).toBe(true);
            (0, vitest_1.expect)(result.length).toBe(2);
            (0, vitest_1.expect)(result[0] instanceof TestEntity).toBe(true);
        });
        (0, vitest_1.it)('should return null if find operation fails', async () => {
            class TestEntity {
            }
            repositoryStub.find.rejects(new Error('Find error'));
            const result = await respository_services_1.Repository.findAll(TestEntity);
            (0, vitest_1.expect)(result).toBeNull();
        });
    });
    (0, vitest_1.describe)('insert', () => {
        (0, vitest_1.it)('should insert a new entity', async () => {
            class TestEntity {
            }
            const newEntity = new TestEntity();
            repositoryStub.create.returns(newEntity);
            repositoryStub.save.resolves(newEntity);
            const result = await respository_services_1.Repository.insert(TestEntity, {});
            (0, vitest_1.expect)(repositoryStub.create.calledOnce).toBe(true);
            (0, vitest_1.expect)(repositoryStub.save.calledOnce).toBe(true);
            (0, vitest_1.expect)(result instanceof TestEntity).toBe(true);
        });
        (0, vitest_1.it)('should return null if insert operation fails', async () => {
            class TestEntity {
            }
            repositoryStub.create.returns(new TestEntity());
            repositoryStub.save.rejects(new Error('Save error'));
            const result = await respository_services_1.Repository.insert(TestEntity, {});
            (0, vitest_1.expect)(result).toBeNull();
        });
    });
    (0, vitest_1.describe)('update', () => {
        (0, vitest_1.it)('should update an existing entity', async () => {
            class TestEntity {
            }
            const entity = new TestEntity();
            repositoryStub.update.resolves();
            repositoryStub.findOne.resolves(entity);
            const result = await respository_services_1.Repository.update(TestEntity, 1, {});
            (0, vitest_1.expect)(repositoryStub.update.calledOnce).toBe(true);
            (0, vitest_1.expect)(result instanceof TestEntity).toBe(true);
        });
        (0, vitest_1.it)('should return null if update operation fails', async () => {
            class TestEntity {
            }
            repositoryStub.update.rejects(new Error('Update error'));
            const result = await respository_services_1.Repository.update(TestEntity, 1, {});
            (0, vitest_1.expect)(result).toBeNull();
        });
    });
    (0, vitest_1.describe)('delete', () => {
        (0, vitest_1.it)('should delete an entity', async () => {
            class TestEntity {
            }
            const deleteResult = { affected: 1 };
            repositoryStub.delete.resolves(deleteResult);
            const result = await respository_services_1.Repository.delete(TestEntity, 1);
            (0, vitest_1.expect)(repositoryStub.delete.calledOnce).toBe(true);
            (0, vitest_1.expect)(result.affected).toBe(1);
        });
        (0, vitest_1.it)('should return null if delete operation fails', async () => {
            class TestEntity {
            }
            repositoryStub.delete.rejects(new Error('Delete error'));
            const result = await respository_services_1.Repository.delete(TestEntity, 1);
            (0, vitest_1.expect)(result).toBeNull();
        });
    });
});
