import { Module } from '@cmmv/core';

import { I18nCoinsContract } from '@contracts/i18n/coins.contract';
import { I18nCountryContract } from '../contracts/i18n/countries.contract';

export let I18nModule = new Module('i18n', {
    contracts: [I18nCoinsContract, I18nCountryContract],
});
