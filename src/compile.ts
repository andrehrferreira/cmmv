import { Application } from '@cmmv/core';
import { DefaultHTTPModule } from '@cmmv/http';
import { ProtobufModule } from '@cmmv/protobuf';
import { WSModule } from '@cmmv/ws';
import { ViewModule } from '@cmmv/view';
import { RepositoryModule, Repository } from '@cmmv/repository';
import { CacheModule, CacheService } from '@cmmv/cache';
import { SchedulingModule, SchedulingService } from '@cmmv/scheduling';
import { AuthModule } from '@cmmv/auth';

Application.compile({
    modules: [
        DefaultHTTPModule,
        ProtobufModule,
        WSModule,
        ViewModule,
        RepositoryModule,
        CacheModule,
        SchedulingModule,
        AuthModule,
    ],
    services: [Repository, CacheService, SchedulingService],
});
