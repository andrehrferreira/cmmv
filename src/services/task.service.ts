// Generated automatically by CMMV
    
import { Telemetry } from "@cmmv/core";
import { Repository } from '@cmmv/repository';
import { TaskEntity } from '../entities/task.entity';

export class TaskService {

    async getAll(queries: any, req: any): Promise<TaskEntity[]> {
        const instance = Repository.getInstance();
        const repository = instance.dataSource.getRepository(TaskEntity);
        Telemetry.start('Repository Get All', req.requestId);
        let result = await repository.find();
        Telemetry.end('Repository Get All', req.requestId);
        return result;
    }

    async getById(id: string, req: any): Promise<TaskEntity> {
        const instance = Repository.getInstance();
        const repository = instance.dataSource.getRepository(TaskEntity);
        Telemetry.start('Repository Get By Id', req.requestId);
        const item = await repository.findOneBy({ id });
        Telemetry.end('Repository Get By Id', req.requestId);

        if (!item) 
            throw new Error('Item not found');
        
        return item;
    }

    async add(item: Partial<TaskEntity>, req: any): Promise<TaskEntity> {
        const instance = Repository.getInstance();
        const repository = instance.dataSource.getRepository(TaskEntity);
        Telemetry.start('Repository Add', req.requestId);
        const result = await repository.save(item);
        Telemetry.end('Repository Add', req.requestId);
        return result;
    }

    async update(id: string, item: Partial<TaskEntity>, req: any): Promise<TaskEntity> {
        const instance = Repository.getInstance();
        const repository = instance.dataSource.getRepository(TaskEntity);
        Telemetry.start('Repository Update', req.requestId);
        await repository.update(id, item);
        let result = await repository.findOneBy({ id });
        Telemetry.end('Repository Update', req.requestId);
        return result;
    }

    async delete(id: string, req: any): Promise<{ success: boolean, affected: number }> {
        const instance = Repository.getInstance();
        const repository = instance.dataSource.getRepository(TaskEntity);
        Telemetry.start('Repository Delete', req.requestId);
        const result = await repository.delete(id);
        Telemetry.end('Repository Delete', req.requestId);
        return { success: result.affected > 0, affected: result.affected };
    }
}
