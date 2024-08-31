import { AbstractContract, Contract, ContractField } from "@cmmv/core";

@Contract({
    controllerName: "Task",
    databaseType: "mongodb",
    protoPath: "src/protos/tasks.proto"
})
export class TasksContract extends AbstractContract {
    @ContractField({ 
        protoType: 'string', 
        unique: true 
    })
    label: string;

    @ContractField({ 
        protoType: 'bool', 
        defaultValue: false 
    })
    checked: boolean;

    @ContractField({ 
        protoType: 'bool', 
        defaultValue: false 
    })
    removed: boolean;
}