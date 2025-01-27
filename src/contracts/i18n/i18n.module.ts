import { Module } from '@cmmv/core';

import { I18nCoinsContract } from './coins.contract';

export let I18nModule = new Module('i18n', {
    contracts: [I18nCoinsContract],
});
