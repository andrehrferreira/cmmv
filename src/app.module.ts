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
import { UserController } from './controllers/auth/user.controller';
import { I18nCoinsController } from './controllers/i18n/i18ncoins.controller';
import { AuthController } from './controllers/auth/auth.controller';

//Providers
import { UserService } from './services/auth/user.service';
import { I18nCoinsService } from './services/i18n/i18ncoins.service';
import { UserGateway } from './gateways/auth/user.gateway';
import { I18nCoinsGateway } from './gateways/i18n/i18ncoins.gateway';
import { AuthService } from './services/auth/auth.service';
import { AuthGateway } from './gateways/auth/auth.gateway';

export let ApplicationModule = new Module('app', {
    controllers: [UserController, I18nCoinsController, AuthController],
    providers: [
        UserService,
        I18nCoinsService,
        UserGateway,
        I18nCoinsGateway,
        AuthService,
        AuthGateway,
    ],
    transpilers: [ApplicationTranspile],
});
