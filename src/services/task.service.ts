// Generated automatically by CMMV
    
import { Telemetry } from "@cmmv/core";
import { AbstractService, Service } from '@cmmv/http';
import { Repository } from '@cmmv/repository';
import { TaskEntity } from '../entities/task.entity';

@Service("task")
export class TaskService extends AbstractService {
    public override name = "task";

    async getAll(queries?: any, req?: any): Promise<TaskEntity[]> {
        const instance = Repository.getInstance();
        const repository = instance.dataSource.getRepository(TaskEntity);
        Telemetry.start('TaskService::GetAll', req?.requestId);
        let result = await repository.find();
        Telemetry.end('TaskService::GetAll', req?.requestId);
        return result;
    }

    async getById(id: string, req?: any): Promise<TaskEntity> {
        const instance = Repository.getInstance();
        const repository = instance.dataSource.getRepository(TaskEntity);
        Telemetry.start('TaskService::GetById', req?.requestId);
        const item = await repository.findOneBy({ id });
        Telemetry.end('TaskService::GetById', req?.requestId);

        if (!item) 
            throw new Error('Item not found');
        
        return item;
    }

    async add(item: Partial<TaskEntity>, req?: any): Promise<TaskEntity> {
        const instance = Repository.getInstance();
        const repository = instance.dataSource.getRepository(TaskEntity);
        Telemetry.start('TaskService::Add', req?.requestId);
        const result = await repository.save(item);
        Telemetry.end('TaskService::Add', req?.requestId);
        return result;
    }

    async update(id: string, item: Partial<TaskEntity>, req?: any): Promise<TaskEntity> {
        const instance = Repository.getInstance();
        const repository = instance.dataSource.getRepository(TaskEntity);
        Telemetry.start('TaskService::Update', req?.requestId);
        await repository.update(id, item);
        let result = await repository.findOneBy({ id });
        Telemetry.end('TaskService::Update', req?.requestId);
        return result;
    }

    async delete(id: string, req?: any): Promise<{ success: boolean, affected: number }> {
        const instance = Repository.getInstance();
        const repository = instance.dataSource.getRepository(TaskEntity);
        Telemetry.start('TaskService::Delete', req?.requestId);
        const result = await repository.delete(id);
        Telemetry.end('TaskService::Delete', req?.requestId);
        return { success: result.affected > 0, affected: result.affected };
    }
}
