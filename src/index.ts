import { Application } from '@cmmv/core';
import { DefaultAdapter, DefaultHTTPModule } from '@cmmv/http';
import { ProtobufModule } from '@cmmv/protobuf';
import { WSModule, WSAdapter } from '@cmmv/ws';
import { ViewModule } from '@cmmv/view';
import { RepositoryModule, Repository } from '@cmmv/repository';
import { CacheModule, CacheService } from '@cmmv/cache';
import { SchedulingModule, SchedulingService } from '@cmmv/scheduling';
import { AuthModule } from '@cmmv/auth';
import { IndexModule } from './modules/index.module';
import { MainModule } from './modules/main.module';

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
        IndexModule,
        MainModule,
    ],
    services: [Repository, CacheService, SchedulingService],
});
