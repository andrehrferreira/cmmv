import { Module } from '@cmmv/core';

import { ViewTranspile } from '../transpilers/view.transpile';

export const ViewModule = new Module('view', {
    transpilers: [ViewTranspile],
});
