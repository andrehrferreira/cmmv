// Generated automatically by CMMV

import 'reflect-metadata';
import { Module, ApplicationTranspile } from '@cmmv/core';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { TaskGateway } from './gateways/task.gateway';

export let ApplicationModule = new Module('app', {
    controllers: [TaskController],
    providers: [TaskService, TaskGateway],
    transpilers: [ApplicationTranspile],
});
