import { Module } from '@cmmv/core';
import { I18nModule } from './i18n.module';

export let MainModule = new Module('main', {
    submodules: [I18nModule],
});
