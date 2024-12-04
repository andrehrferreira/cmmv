import { Module } from '@cmmv/core';

import { ViewConfig } from './view.config';
import { ViewTranspile } from './view.transpile';

export const ViewModule = new Module('view', {
    configs: [ViewConfig],
    transpilers: [ViewTranspile],
});
