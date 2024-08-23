import { AbstractContract, Contract, ContractField } from "@cmmv/core";

@Contract({
    controllerName: "tasks",
    databaseType: "mongodb",
    protoPath: "src/protos/tasks.proto"
})
export class Tasks extends AbstractContract {
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