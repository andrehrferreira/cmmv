import { AbstractContract, Contract, ContractField } from "@cmmv/core";

@Contract({
    controllerName: "queue",
    protoPath: "src/protos/queue.proto"
})
export class QueueContract extends AbstractContract {
    @ContractField({ 
        protoType: 'string', 
        unique: true 
    })
    key: string;

    @ContractField({ protoType: 'any' })
    payload: any;
}