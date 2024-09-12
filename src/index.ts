import './app.config';
import { Application } from '@cmmv/core';
import { ExpressAdapter, ExpressModule } from '@cmmv/http';
import { ProtobufModule } from '@cmmv/protobuf';
import { WSModule, WSAdapter } from '@cmmv/ws';
import { ViewModule } from '@cmmv/view';
import { RepositoryModule, Repository } from '@cmmv/repository';
import { CacheModule, CacheService } from '@cmmv/cache';
import { SchedulingModule, SchedulingService } from '@cmmv/scheduling';
import { AuthModule } from '@cmmv/auth';

//Contracts
import { TasksContract } from './contracts/tasks.contract';

Application.create({
    httpAdapter: ExpressAdapter,
    wsAdapter: WSAdapter,
    modules: [
        ExpressModule,
        ProtobufModule,
        WSModule,
        ViewModule,
        RepositoryModule,
        CacheModule,
        SchedulingModule,
        AuthModule,
    ],
    services: [Repository, CacheService, SchedulingService],
    contracts: [TasksContract],
});
