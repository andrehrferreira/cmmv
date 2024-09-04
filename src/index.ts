require('dotenv').config()

import { Application } from "@cmmv/core";
import { ExpressAdapter, ExpressModule } from "@cmmv/http";
import { ProtobufModule } from "@cmmv/protobuf";
import { WSModule, WSAdapter } from "@cmmv/ws";
import { ViewModule } from "@cmmv/view";
import { RepositoryModule, Repository } from "@cmmv/repository";

//Contracts
import { TasksContract } from "./contracts/tasks.contract";

Application.create({
    httpAdapter: ExpressAdapter,    
    wsAdapter: WSAdapter,
    modules: [
        ExpressModule,
        ProtobufModule,
        WSModule,
        ViewModule,
        RepositoryModule
    ],
    services: [Repository],
    contracts: [
        TasksContract
    ]
});