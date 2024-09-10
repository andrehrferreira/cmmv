import { Module } from '@cmmv/core';

import { SchedulingService } from './scheduling.service';

export let SchedulingModule = new Module('scheduling', {
    providers: [SchedulingService],
});
