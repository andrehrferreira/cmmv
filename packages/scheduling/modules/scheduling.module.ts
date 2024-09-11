import { Module } from '@cmmv/core';

import { SchedulingService } from '../services/scheduling.service';

export let SchedulingModule = new Module('scheduling', {
    providers: [SchedulingService],
});
