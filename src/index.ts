import { Application } from '@cmmv/core';
import { DefaultAdapter, DefaultHTTPModule } from '@cmmv/http';
import { ProtobufModule } from '@cmmv/protobuf';
import { WSModule, WSAdapter } from '@cmmv/ws';
import { ViewModule } from '@cmmv/view';
import { RepositoryModule, Repository } from '@cmmv/repository';
import { CacheModule, CacheService } from '@cmmv/cache';
import { SchedulingModule, SchedulingService } from '@cmmv/scheduling';
import { AuthModule } from '@cmmv/auth';
import { ViteModule } from '@cmmv/vite';
import { IndexModule } from './modules/index.module';
import morgan from '@cmmv/morgan';

//Contracts
import { TasksContract } from './contracts/tasks.contract';

Application.create({
    httpAdapter: DefaultAdapter,
    wsAdapter: WSAdapter,
    httpMiddlewares: [morgan('combined')],
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
    contracts: [TasksContract],
});
