/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import 'reflect-metadata';
import { Module, ApplicationTranspile } from '@cmmv/core';

//Controllers
import { TaskController } from './controllers/task.controller';
import { UserController } from './controllers/auth/user.controller';
import { I18nCoinsController } from './controllers/i18n/i18ncoins.controller';
import { AuthController } from './controllers/auth/auth.controller';

//Providers
import { TaskService } from './services/task.service';
import { UserService } from './services/auth/user.service';
import { I18nCoinsService } from './services/i18n/i18ncoins.service';
import { TaskGateway } from './gateways/task.gateway';
import { UserGateway } from './gateways/auth/user.gateway';
import { I18nCoinsGateway } from './gateways/i18n/i18ncoins.gateway';
import { AuthService } from './services/auth/auth.service';
import { AuthGateway } from './gateways/auth/auth.gateway';

export let ApplicationModule = new Module('app', {
    controllers: [
        TaskController,
        UserController,
        I18nCoinsController,
        AuthController,
    ],
    providers: [
        TaskService,
        UserService,
        I18nCoinsService,
        TaskGateway,
        UserGateway,
        I18nCoinsGateway,
        AuthService,
        AuthGateway,
    ],
    transpilers: [ApplicationTranspile],
});
