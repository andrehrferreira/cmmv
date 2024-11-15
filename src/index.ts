import { Application } from '@cmmv/core';
import { DefaultAdapter, DefaultHTTPModule } from '@cmmv/http';
import { ProtobufModule } from '@cmmv/protobuf';
import { WSModule, WSAdapter } from '@cmmv/ws';
import { ViewModule, VueTranspile } from '@cmmv/view';
import { RepositoryModule, Repository } from '@cmmv/repository';
import { CacheModule, CacheService } from '@cmmv/cache';
import { SchedulingModule, SchedulingService } from '@cmmv/scheduling';
import { AuthModule } from '@cmmv/auth';
import { ViteModule } from '@cmmv/vite';

//Contracts
import { TasksContract } from './contracts/tasks.contract';
import { IndexModule } from './modules/index.module';

Application.create({
    httpAdapter: DefaultAdapter,
    wsAdapter: WSAdapter,
    modules: [
        DefaultHTTPModule,
        ProtobufModule,
        WSModule,
        ViewModule,
        RepositoryModule,
        CacheModule,
        SchedulingModule,
        AuthModule,
        ViteModule,
        IndexModule,
    ],
    services: [Repository, CacheService, SchedulingService],
    transpilers: [VueTranspile],
    contracts: [TasksContract],
});
