"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = require("assert");
const service_registry_1 = require("../../registries/service.registry");
const service_decorator_1 = require("../../decorators/service.decorator");
describe('Service Decorator', function () {
    beforeEach(function () {
        service_registry_1.ServiceRegistry.clear();
    });
    it('should register a service with a given name', function () {
        let MyService = class MyService {
        };
        MyService = tslib_1.__decorate([
            (0, service_decorator_1.Service)('MyService')
        ], MyService);
        const service = service_registry_1.ServiceRegistry.getService('MyService');
        assert_1.strict.strictEqual(service, MyService);
    });
    it('should register a service with a default name when none is provided', function () {
        let MyDefaultService = class MyDefaultService {
        };
        MyDefaultService = tslib_1.__decorate([
            (0, service_decorator_1.Service)()
        ], MyDefaultService);
        const serviceName = Reflect.getMetadata('service_name', MyDefaultService);
        assert_1.strict.strictEqual(serviceName, '');
        const service = service_registry_1.ServiceRegistry.getService('');
        assert_1.strict.strictEqual(service, MyDefaultService);
    });
    it('should return undefined for unregistered service', function () {
        const service = service_registry_1.ServiceRegistry.getService('NonExistentService');
        assert_1.strict.strictEqual(service, undefined);
    });
    it('should handle multiple services with different names', function () {
        let ServiceOne = class ServiceOne {
        };
        ServiceOne = tslib_1.__decorate([
            (0, service_decorator_1.Service)('ServiceOne')
        ], ServiceOne);
        let ServiceTwo = class ServiceTwo {
        };
        ServiceTwo = tslib_1.__decorate([
            (0, service_decorator_1.Service)('ServiceTwo')
        ], ServiceTwo);
        const serviceOne = service_registry_1.ServiceRegistry.getService('ServiceOne');
        const serviceTwo = service_registry_1.ServiceRegistry.getService('ServiceTwo');
        assert_1.strict.strictEqual(serviceOne, ServiceOne);
        assert_1.strict.strictEqual(serviceTwo, ServiceTwo);
    });
    afterEach(function () {
        service_registry_1.ServiceRegistry.clear();
    });
});
