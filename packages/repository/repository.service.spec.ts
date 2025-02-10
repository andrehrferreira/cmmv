import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as sinon from 'sinon';
import { DataSource, Repository as TypeORMRepository } from 'typeorm';
import { Repository } from './repository.service';

describe('Repository', () => {
    let sandbox: sinon.SinonSandbox;
    let dataSourceStub: sinon.SinonStubbedInstance<DataSource>;
    let repositoryStub: sinon.SinonStubbedInstance<TypeORMRepository<any>>;

    beforeEach(() => {
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

    afterEach(() => {
        sandbox.restore();
    });

    describe('getRepository', () => {
        it('should return the TypeORM repository for a given entity', () => {
            class TestEntity {}

            const repository = Repository['getRepository'](TestEntity);

            expect(
                dataSourceStub.getRepository.calledOnceWithExactly(TestEntity),
            ).toBe(true);
        });
    });

    describe('findBy', () => {
        it('should find an entity by criteria', async () => {
            class TestEntity {}
            const criteria = { id: 1 };
            repositoryStub.findOne.resolves(new TestEntity());

            const result = await Repository.findBy(TestEntity, criteria);

            expect(repositoryStub.findOne.calledOnce).toBe(true);
        });

        it('should return null if find operation fails', async () => {
            class TestEntity {}
            repositoryStub.findOne.rejects(new Error('Find error'));

            const result = await Repository.findBy(TestEntity, {});

            expect(result).toBeNull();
        });
    });

    describe('findAll', () => {
        it('should find all entities', async () => {
            class TestEntity {}
            const entities = [new TestEntity(), new TestEntity()];
            repositoryStub.find.resolves(entities);

            const result = await Repository.findAll(TestEntity);

            expect(repositoryStub.find.calledOnce).toBe(true);
            expect(result.data.length).toBe(2);
        });

        it('should return null if find operation fails', async () => {
            class TestEntity {}
            repositoryStub.find.rejects(new Error('Find error'));

            const result = await Repository.findAll(TestEntity);
            expect(result).toBeNull();
        });
    });

    describe('insert', () => {
        it('should insert a new entity', async () => {
            class TestEntity {}
            const newEntity = new TestEntity();
            repositoryStub.create.returns(newEntity);
            repositoryStub.save.resolves(newEntity);

            const result = await Repository.insert(TestEntity, {});

            expect(repositoryStub.create.calledOnce).toBe(true);
            expect(repositoryStub.save.calledOnce).toBe(true);
            expect(result.data instanceof TestEntity).toBe(true);
        });

        it('should return null if insert operation fails', async () => {
            class TestEntity {}
            repositoryStub.create.returns(new TestEntity());
            repositoryStub.save.rejects(new Error('Save error'));

            const result = await Repository.insert(TestEntity, {});
            expect(result.success).toBe(false);
        });
    });

    describe('update', () => {
        it('should update an existing entity', async () => {
            class TestEntity {}
            const entity = new TestEntity();
            repositoryStub.update.resolves();
            repositoryStub.findOne.resolves(entity);

            const result = await Repository.update(TestEntity, 1, {});

            expect(repositoryStub.update.calledOnce).toBe(true);
        });

        it('should return null if update operation fails', async () => {
            class TestEntity {}
            repositoryStub.update.rejects(new Error('Update error'));

            const result = await Repository.update(TestEntity, 1, {});
            expect(result).toBe(0);
        });
    });

    describe('delete', () => {
        it('should delete an entity', async () => {
            class TestEntity {}
            const deleteResult: any = { affected: 1 };
            repositoryStub.delete.resolves(deleteResult);

            const result = await Repository.delete(TestEntity, 1);

            expect(repositoryStub.delete.calledOnce).toBe(true);
            expect(result).toBe(1);
        });

        it('should return null if delete operation fails', async () => {
            class TestEntity {}
            repositoryStub.delete.rejects(new Error('Delete error'));

            const result = await Repository.delete(TestEntity, 1);
            expect(result).toBe(0);
        });
    });
});
