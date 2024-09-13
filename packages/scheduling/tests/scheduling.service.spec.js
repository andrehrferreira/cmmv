"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = require("assert");
const core_1 = require("@cmmv/core");
const scheduling_service_1 = require("../services/scheduling.service");
const scheduling_decorator_1 = require("../decorators/scheduling.decorator");
const scheduling_manager_1 = require("../manager/scheduling.manager");
let mockCronJob = {
    start: () => { },
    stop: () => { },
    cronTime: '',
    onTick: () => { },
    started: false,
    stopped: false,
};
class MockSchedulingManager extends scheduling_manager_1.SchedulingManager {
    constructor(cronTime, onTick) {
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
    start() {
        mockCronJob.start();
    }
    stop() {
        mockCronJob.stop();
    }
    changeCronTime(newCronTime) {
        mockCronJob.cronTime = newCronTime;
    }
}
global.SchedulingManager = MockSchedulingManager;
describe('SchedulingService with SchedulingManager', function () {
    let schedulingService;
    beforeEach(function () {
        schedulingService = new scheduling_service_1.SchedulingService();
    });
    it('should register a cron job with the correct schedule', function () {
        class TestClass {
            handleCron() {
                console.log('Cron executed');
            }
        }
        tslib_1.__decorate([
            (0, scheduling_decorator_1.Cron)('*/5 * * * * *'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestClass.prototype, "handleCron", null);
        const instance = new TestClass();
        schedulingService.loadConfig();
        const registeredCron = core_1.Scope.getArray('__crons');
        assert_1.strict.strictEqual(registeredCron.length, 1, 'Should have 1 registered cron job');
        assert_1.strict.strictEqual(registeredCron[0].cronTime, '*/5 * * * * *', 'Cron time should match the provided pattern');
    });
    it('should correctly execute the cron job and maintain the correct "this" context', function () {
        const mockFunction = function () {
            this.called = true;
        };
        const instance = {
            called: false,
            handleCron: mockFunction,
        };
        class TestClass {
            handleCron() {
                instance.handleCron.call(this);
            }
        }
        tslib_1.__decorate([
            (0, scheduling_decorator_1.Cron)('*/1 * * * * *'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestClass.prototype, "handleCron", null);
        new TestClass();
        schedulingService.loadConfig();
        const registeredCron = core_1.Scope.getArray('__crons');
        registeredCron[0].onTick();
        assert_1.strict.strictEqual(instance.called, true, 'Cron should have been called with correct "this" context');
    });
    it('should start all cron jobs correctly', function () {
        mockCronJob.started = false;
        class TestClass {
            handleCron() {
                console.log('Cron executed');
            }
        }
        tslib_1.__decorate([
            (0, scheduling_decorator_1.Cron)('*/10 * * * * *'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestClass.prototype, "handleCron", null);
        new TestClass();
        schedulingService.loadConfig();
        schedulingService.startJobs();
        assert_1.strict.strictEqual(mockCronJob.started, true, 'Cron job should have been started');
    });
    it('should stop all cron jobs correctly', function () {
        mockCronJob.stopped = false;
        class TestClass {
            handleCron() {
                console.log('Cron executed');
            }
        }
        tslib_1.__decorate([
            (0, scheduling_decorator_1.Cron)('*/10 * * * * *'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestClass.prototype, "handleCron", null);
        new TestClass();
        schedulingService.loadConfig();
        schedulingService.stopJobs();
        assert_1.strict.strictEqual(mockCronJob.stopped, true, 'Cron job should have been stopped');
    });
    it('should change cron time correctly', function () {
        class TestClass {
            handleCron() {
                console.log('Cron executed');
            }
        }
        tslib_1.__decorate([
            (0, scheduling_decorator_1.Cron)('*/10 * * * * *'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestClass.prototype, "handleCron", null);
        new TestClass();
        schedulingService.loadConfig();
        schedulingService.changeCronTimeForJob(0, '*/20 * * * * *');
        assert_1.strict.strictEqual(mockCronJob.cronTime, '*/20 * * * * *', 'Cron time should have been changed');
    });
});
