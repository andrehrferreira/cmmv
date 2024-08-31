import { AbstractContract, Contract, ContractField } from "@cmmv/core";

@Contract({ 
    controllerName: "wscall",
    protoPath: "src/protos/ws.proto",
    protoPackage: "ws",
    directMessage: true,
    generateController: false 
})
export class WSContract extends AbstractContract {
    @ContractField({ protoType: 'int32' })
    contract: number;

    @ContractField({ protoType: 'int32' })
    message: number;

    @ContractField({ protoType: 'bytes' })
    data: Uint8Array;
}