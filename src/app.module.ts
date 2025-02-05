/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import 'reflect-metadata';

import { Module, ApplicationTranspile, ApplicationConfig } from '@cmmv/core';

//Controllers
import { UserController } from './controllers/auth/user.controller';
import { RolesController } from './controllers/auth/roles.controller';
import { I18nCoinsController } from './controllers/i18n/i18ncoins.controller';
import { I18nCountriesController } from './controllers/i18n/i18ncountries.controller';
import { AuthController } from './controllers/auth/auth.controller';

//Providers
import { UserService } from './services/auth/user.service';
import { RolesService } from './services/auth/roles.service';
import { I18nCoinsService } from './services/i18n/i18ncoins.service';
import { I18nCountriesService } from './services/i18n/i18ncountries.service';
import { UserGateway } from './gateways/auth/user.gateway';
import { RolesGateway } from './gateways/auth/roles.gateway';
import { I18nCoinsGateway } from './gateways/i18n/i18ncoins.gateway';
import { I18nCountriesGateway } from './gateways/i18n/i18ncountries.gateway';
import { AuthService } from './services/auth/auth.service';
import { AuthGateway } from './gateways/auth/auth.gateway';

export let ApplicationModule = new Module('app', {
    configs: [ApplicationConfig],
    controllers: [
        UserController,
        RolesController,
        I18nCoinsController,
        I18nCountriesController,
        AuthController,
    ],
    providers: [
        UserService,
        RolesService,
        I18nCoinsService,
        I18nCountriesService,
        UserGateway,
        RolesGateway,
        I18nCoinsGateway,
        I18nCountriesGateway,
        AuthService,
        AuthGateway,
    ],
    transpilers: [ApplicationTranspile],
});
