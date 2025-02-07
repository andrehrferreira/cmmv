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
import { RolesController } from './controllers/auth/roles.controller';
import { GroupsController } from './controllers/auth/groups.controller';
import { UserController } from './controllers/auth/user.controller';
import { I18nCoinsController } from './controllers/i18n/i18ncoins.controller';
import { I18nCountriesController } from './controllers/i18n/i18ncountries.controller';

//Providers
import { RolesService } from './services/auth/roles.service';
import { GroupsService } from './services/auth/groups.service';
import { UserService } from './services/auth/user.service';
import { I18nCoinsService } from './services/i18n/i18ncoins.service';
import { I18nCountriesService } from './services/i18n/i18ncountries.service';
import { RolesGateway } from './gateways/auth/roles.gateway';
import { GroupsGateway } from './gateways/auth/groups.gateway';
import { UserGateway } from './gateways/auth/user.gateway';
import { I18nCoinsGateway } from './gateways/i18n/i18ncoins.gateway';
import { I18nCountriesGateway } from './gateways/i18n/i18ncountries.gateway';

export let ApplicationModule = new Module('app', {
    configs: [ApplicationConfig],
    controllers: [
        RolesController,
        GroupsController,
        UserController,
        I18nCoinsController,
        I18nCountriesController,
    ],
    providers: [
        RolesService,
        GroupsService,
        UserService,
        I18nCoinsService,
        I18nCountriesService,
        RolesGateway,
        GroupsGateway,
        UserGateway,
        I18nCoinsGateway,
        I18nCountriesGateway,
    ],
    transpilers: [ApplicationTranspile],
});
