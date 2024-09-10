import { AbstractService, Service } from '@cmmv/core';
import { Cron } from '@cmmv/scheduling';

@Service('crontest')
export class CronTests extends AbstractService {
    public name = 'crontest';

    @Cron('*/5 * * * * *')
    async cronHandler() {
        //console.log("Cron executed");
    }
}
