require('dotenv').config();

import { Application } from '@cmmv/core';
import { ExpressAdapter, ExpressModule } from '@cmmv/http';
import { ProtobufModule } from '@cmmv/protobuf';
import { WSModule, WSAdapter } from '@cmmv/ws';
import { ViewModule } from '@cmmv/view';
import { RepositoryModule, Repository } from '@cmmv/repository';
import { CacheModule, CacheService } from '@cmmv/cache';
import { SchedulingModule, SchedulingService } from '@cmmv/scheduling';

import { CronTests } from './crons/test.cron';

//Contracts
import { UsersContract } from './contracts/users.contract';
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
    ],
    services: [Repository, CacheService, SchedulingService, CronTests],
    contracts: [UsersContract, TasksContract],
});
