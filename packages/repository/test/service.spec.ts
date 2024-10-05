import { strict as assert } from 'assert';
import * as sinon from 'sinon';
import {
    DataSource,
    Repository as TypeORMRepository,
    DeleteResult,
} from 'typeorm';
import { Repository } from '../services/respository.services';
import { Config } from '@cmmv/core';

describe('Repository', function () {
    let sandbox: sinon.SinonSandbox;
    let dataSourceStub: sinon.SinonStubbedInstance<DataSource>;
    let repositoryStub: sinon.SinonStubbedInstance<TypeORMRepository<any>>;

    beforeEach(function () {
        sandbox = sinon.createSandbox();

        // Mock the data source and repository
        dataSourceStub = sandbox.createStubInstance(DataSource);
        repositoryStub = sandbox.createStubInstance(TypeORMRepository);
        Repository.getInstance().dataSource =
            dataSourceStub as unknown as DataSource;

        dataSourceStub.getRepository.returns(
            repositoryStub as unknown as TypeORMRepository<any>,
        );
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('getRepository', function () {
        it('should return the TypeORM repository for a given entity', function () {
            class TestEntity {}

            const repository = Repository['getRepository'](TestEntity);

            assert.strictEqual(
                dataSourceStub.getRepository.calledOnceWithExactly(TestEntity),
                true,
            );
        });
    });

    describe('findBy', function () {
        it('should find an entity by criteria', async function () {
            class TestEntity {}
            const criteria = { id: 1 };
            repositoryStub.findOne.resolves(new TestEntity());

            const result = await Repository.findBy(TestEntity, criteria);

            assert.strictEqual(repositoryStub.findOne.calledOnce, true);
            assert.strictEqual(result instanceof TestEntity, true);
        });

        it('should return null if find operation fails', async function () {
            class TestEntity {}
            repositoryStub.findOne.rejects(new Error('Find error'));

            const result = await Repository.findBy(TestEntity, {});

            assert.strictEqual(result, null);
        });
    });

    describe('findOneBy', function () {
        it('should find one entity by criteria', async function () {
            class TestEntity {}
            const criteria = { id: 1 };
            repositoryStub.findOne.resolves(new TestEntity());

            const result = await Repository.findOneBy(TestEntity, criteria);

            assert.strictEqual(repositoryStub.findOne.calledOnce, true);
            assert.strictEqual(result instanceof TestEntity, true);
        });

        it('should return null if find operation fails', async function () {
            class TestEntity {}
            repositoryStub.findOne.rejects(new Error('Find error'));

            const result = await Repository.findOneBy(TestEntity, {});

            assert.strictEqual(result, null);
        });
    });

    describe('findAll', function () {
        it('should find all entities', async function () {
            class TestEntity {}
            const entities = [new TestEntity(), new TestEntity()];
            repositoryStub.find.resolves(entities);

            const result = await Repository.findAll(TestEntity);

            assert.strictEqual(repositoryStub.find.calledOnce, true);
            assert.strictEqual(result.length, 2);
            assert.strictEqual(result[0] instanceof TestEntity, true);
        });

        it('should return null if find operation fails', async function () {
            class TestEntity {}
            repositoryStub.find.rejects(new Error('Find error'));

            const result = await Repository.findAll(TestEntity);

            assert.strictEqual(result, null);
        });
    });

    describe('insert', function () {
        it('should insert a new entity', async function () {
            class TestEntity {}
            const newEntity = new TestEntity();
            repositoryStub.create.returns(newEntity);
            repositoryStub.save.resolves(newEntity);

            const result = await Repository.insert(TestEntity, {});

            assert.strictEqual(repositoryStub.create.calledOnce, true);
            assert.strictEqual(repositoryStub.save.calledOnce, true);
            assert.strictEqual(result instanceof TestEntity, true);
        });

        it('should return null if insert operation fails', async function () {
            class TestEntity {}
            repositoryStub.create.returns(new TestEntity());
            repositoryStub.save.rejects(new Error('Save error'));

            const result = await Repository.insert(TestEntity, {});

            assert.strictEqual(result, null);
        });
    });

    describe('update', function () {
        it('should update an existing entity', async function () {
            class TestEntity {}
            const entity = new TestEntity();
            repositoryStub.update.resolves();
            repositoryStub.findOne.resolves(entity);

            const result = await Repository.update(TestEntity, 1, {});

            assert.strictEqual(repositoryStub.update.calledOnce, true);
            assert.strictEqual(result instanceof TestEntity, true);
        });

        it('should return null if update operation fails', async function () {
            class TestEntity {}
            repositoryStub.update.rejects(new Error('Update error'));

            const result = await Repository.update(TestEntity, 1, {});

            assert.strictEqual(result, null);
        });
    });

    describe('delete', function () {
        it('should delete an entity', async function () {
            class TestEntity {}
            const deleteResult: any = { affected: 1 };
            repositoryStub.delete.resolves(deleteResult);

            const result = await Repository.delete(TestEntity, 1);

            assert.strictEqual(repositoryStub.delete.calledOnce, true);
            assert.strictEqual(result.affected, 1);
        });

        it('should return null if delete operation fails', async function () {
            class TestEntity {}
            repositoryStub.delete.rejects(new Error('Delete error'));

            const result = await Repository.delete(TestEntity, 1);

            assert.strictEqual(result, null);
        });
    });
});
