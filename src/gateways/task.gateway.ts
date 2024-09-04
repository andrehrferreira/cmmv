// Generated automatically by CMMV
    
import { Rpc, Message, Data, Socket, RpcUtils } from "@cmmv/ws";
import { plainToClass } from 'class-transformer';
import { TaskEntity } from '../entities/task.entity';

import { 
    AddTaskRequest, 
    UpdateTaskRequest,   
    DeleteTaskRequest 
} from "../protos/task";

import { TaskService } from '../services/task.service';

@Rpc("task")
export class TaskGateway {
    constructor(private readonly taskservice: TaskService) {}

    @Message("GetAllTaskRequest")
    async getAll(@Socket() socket){
        const items = await this.taskservice.getAll();
        const response = await RpcUtils.pack("task", "GetAllTaskResponse", items);

        if(response)
            socket.send(response);
    }

    @Message("AddTaskRequest")
    async add(@Data() data: AddTaskRequest, @Socket() socket){
        const entity = plainToClass(TaskEntity, data.item);
        const result = await this.taskservice.add(entity);
        const response = await RpcUtils.pack("task", "AddTaskResponse", { item: result, id: result.id });

        if(response)
            socket.send(response);
    }

    @Message("UpdateTaskRequest")
    async update(@Data() data: UpdateTaskRequest, @Socket() socket){
        const entity = plainToClass(TaskEntity, data.item);
        const result = await this.taskservice.update(data.id, entity);
        const response = await RpcUtils.pack("task", "UpdateTaskResponse", { item: result, id: result.id });

        if(response)
            socket.send(response);
    }

    @Message("DeleteTaskRequest")
    async delete(@Data() data: DeleteTaskRequest, @Socket() socket){
        const result = (await this.taskservice.delete(data.id)).success;
        const response = await RpcUtils.pack("task", "DeleteTaskResponse", { success: result, id: data.id });

        if(response)
            socket.send(response);
    }
}