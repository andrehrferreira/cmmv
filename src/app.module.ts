// Generated automatically by CMMV

import 'reflect-metadata';
import { Module, ApplicationTranspile } from '@cmmv/core';
import { TaskController } from './controllers/task.controller';
import { AuthController } from './controllers/auth.controller';
import { TaskService } from './services/task.service';
import { TaskGateway } from './gateways/task.gateway';
import { AuthService } from './services/auth.service';
import { AuthGateway } from './gateways/auth.gateway';

export let ApplicationModule = new Module('app', {
    controllers: [TaskController, AuthController],
    providers: [TaskService, TaskGateway, AuthService, AuthGateway],
    transpilers: [ApplicationTranspile],
});
