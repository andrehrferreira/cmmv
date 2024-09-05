"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const service_registry_util_1 = require("../../utils/service-registry.util");
class TestService {
}
describe('ServiceRegistry', function () {
    beforeEach(function () {
        service_registry_util_1.ServiceRegistry.clear();
    });
    it('should register a service with the given name', function () {
        service_registry_util_1.ServiceRegistry.registerService(TestService, 'TestService');
        const services = service_registry_util_1.ServiceRegistry.getServices();
        assert_1.strict.strictEqual(services.length, 1);
        assert_1.strict.strictEqual(services[0][1].name, 'TestService');
    });
    it('should return the correct service by name', function () {
        service_registry_util_1.ServiceRegistry.registerService(TestService, 'TestService');
        const service = service_registry_util_1.ServiceRegistry.getService('TestService');
        assert_1.strict.strictEqual(service, TestService);
    });
    it('should return undefined for a non-existent service', function () {
        const service = service_registry_util_1.ServiceRegistry.getService('NonExistentService');
        assert_1.strict.strictEqual(service, undefined);
    });
    it('should return all registered services', function () {
        class AnotherService {
        }
        service_registry_util_1.ServiceRegistry.registerService(TestService, 'TestService');
        service_registry_util_1.ServiceRegistry.registerService(AnotherService, 'AnotherService');
        const services = service_registry_util_1.ServiceRegistry.getServices();
        assert_1.strict.strictEqual(services.length, 2);
        assert_1.strict.strictEqual(services[0][1].name, 'TestService');
        assert_1.strict.strictEqual(services[1][1].name, 'AnotherService');
    });
    it('should clear all registered services', function () {
        service_registry_util_1.ServiceRegistry.registerService(TestService, 'TestService');
        service_registry_util_1.ServiceRegistry.clear();
        const services = service_registry_util_1.ServiceRegistry.getServices();
        assert_1.strict.strictEqual(services.length, 0);
    });
});
