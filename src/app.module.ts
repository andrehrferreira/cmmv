// Generated automatically by CMMV

import { Module } from '@cmmv/core';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';

export let ApplicationModule = new Module({
    controllers: [TaskController],
    providers: [TaskService]
});
