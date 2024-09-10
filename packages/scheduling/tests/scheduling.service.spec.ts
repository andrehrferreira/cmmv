import { strict as assert } from 'assert';
import { Scope } from '@cmmv/core';
import { SchedulingService } from '../src/scheduling.service';
import { Cron } from '../src/scheduling.decorator';
import { SchedulingManager } from '../src/scheduling.manager';

let mockCronJob = {
    start: () => {},
    stop: () => {},
    cronTime: '',
    onTick: () => {},
    started: false,
    stopped: false,
};

class MockSchedulingManager extends SchedulingManager {
    constructor(cronTime: string, onTick: () => void) {
        super(cronTime, onTick);
        mockCronJob = {
            cronTime,
            start: () => {
                mockCronJob.started = true;
            },
            stop: () => {
                mockCronJob.stopped = true;
            },
            onTick,
            started: false,
            stopped: false,
        };
    }

    public start(): void {
        mockCronJob.start();
    }

    public stop(): void {
        mockCronJob.stop();
    }

    public changeCronTime(newCronTime: string): void {
        mockCronJob.cronTime = newCronTime;
    }
}

(global as any).SchedulingManager = MockSchedulingManager;

describe('SchedulingService with SchedulingManager', function () {
    let schedulingService;

    beforeEach(function () {
        schedulingService = new SchedulingService();
    });

    it('should register a cron job with the correct schedule', function () {
        class TestClass {
            @Cron('*/5 * * * * *')
            handleCron() {
                console.log('Cron executed');
            }
        }

        const instance = new TestClass();
        schedulingService.loadConfig();

        const registeredCron = Scope.getArray('__crons');
        assert.strictEqual(
            registeredCron.length,
            1,
            'Should have 1 registered cron job',
        );
        assert.strictEqual(
            registeredCron[0].cronTime,
            '*/5 * * * * *',
            'Cron time should match the provided pattern',
        );
    });

    it('should correctly execute the cron job and maintain the correct "this" context', function () {
        const mockFunction = function (this: any) {
            this.called = true;
        };

        const instance = {
            called: false,
            handleCron: mockFunction,
        };

        class TestClass {
            @Cron('*/1 * * * * *')
            handleCron() {
                instance.handleCron.call(this);
            }
        }

        new TestClass();
        schedulingService.loadConfig();

        const registeredCron = Scope.getArray('__crons');
        registeredCron[0].onTick();

        assert.strictEqual(
            instance.called,
            true,
            'Cron should have been called with correct "this" context',
        );
    });

    it('should start all cron jobs correctly', function () {
        mockCronJob.started = false;

        class TestClass {
            @Cron('*/10 * * * * *')
            handleCron() {
                console.log('Cron executed');
            }
        }

        new TestClass();
        schedulingService.loadConfig();

        schedulingService.startJobs();
        assert.strictEqual(
            mockCronJob.started,
            true,
            'Cron job should have been started',
        );
    });

    it('should stop all cron jobs correctly', function () {
        mockCronJob.stopped = false;

        class TestClass {
            @Cron('*/10 * * * * *')
            handleCron() {
                console.log('Cron executed');
            }
        }

        new TestClass();
        schedulingService.loadConfig();

        schedulingService.stopJobs();
        assert.strictEqual(
            mockCronJob.stopped,
            true,
            'Cron job should have been stopped',
        );
    });

    it('should change cron time correctly', function () {
        class TestClass {
            @Cron('*/10 * * * * *')
            handleCron() {
                console.log('Cron executed');
            }
        }

        new TestClass();
        schedulingService.loadConfig();

        schedulingService.changeCronTimeForJob(0, '*/20 * * * * *');
        assert.strictEqual(
            mockCronJob.cronTime,
            '*/20 * * * * *',
            'Cron time should have been changed',
        );
    });
});
