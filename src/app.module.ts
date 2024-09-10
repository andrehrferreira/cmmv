// Generated automatically by CMMV

import { Module, ApplicationTranspile } from '@cmmv/core';
import { UserController } from './controllers/user.controller';
import { TaskController } from './controllers/task.controller';
import { UserService } from './services/user.service';
import { TaskService } from './services/task.service';
import { UserGateway } from './gateways/user.gateway';
import { TaskGateway } from './gateways/task.gateway';

export let ApplicationModule = new Module({
    controllers: [UserController, TaskController],
    providers: [UserService, TaskService, UserGateway, TaskGateway],
    transpilers: [ApplicationTranspile],
});
