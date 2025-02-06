import { Application } from '@cmmv/core';
import { DefaultAdapter, DefaultHTTPModule } from '@cmmv/http';
import { ProtobufModule } from '@cmmv/protobuf';
import { WSModule, WSAdapter } from '@cmmv/ws';
import { ViewModule } from '@cmmv/view';
import { RepositoryModule, Repository } from '@cmmv/repository';
import { SchedulingModule, SchedulingService } from '@cmmv/scheduling';
import { AuthModule } from '@cmmv/auth';
import { FormModule } from '@cmmv/form';

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
        SchedulingModule,
        AuthModule,
        FormModule,
        IndexModule,
        MainModule,
    ],
    services: [Repository, SchedulingService],
});
