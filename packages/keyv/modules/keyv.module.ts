import { Module } from '@cmmv/core';

import { KeyvService } from '../services/keyv.service';

export const KeyvModule = new Module('keyv', {
    providers: [KeyvService],
});
