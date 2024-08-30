import { Application } from "@cmmv/core";
import { ExpressAdapter, ExpressModule } from "@cmmv/http";
import { ProtobufModule } from "@cmmv/protobuf";
import { WSModule, WSAdapter } from "@cmmv/ws";
import { ViewModule } from "@cmmv/view";

//Contracts
import { TasksContract } from "./contracts/tasks.contract";
import { QueueContract } from "./contracts/queue.contract";

const app = Application.create({
    httpAdapter: ExpressAdapter,    
    wsAdapter: WSAdapter,
    httpBind: "0.0.0.0:3000",    
    modules: [
        ExpressModule,
        ProtobufModule,
        WSModule,
        ViewModule
    ],
    contracts: [
        TasksContract,
        QueueContract
    ]
});