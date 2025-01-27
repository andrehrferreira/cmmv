import { Module } from '@cmmv/core';

import { I18nModule } from '../contracts/i18n/i18n.module';

export let MainModule = new Module('main', {
    submodules: [I18nModule],
});
