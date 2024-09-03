import { strict as assert } from 'assert';
import { ServiceRegistry } from '../../utils/service-registry.util';

class TestService {}

describe('ServiceRegistry', function () {
    beforeEach(function () {
        ServiceRegistry.clear();
    });

    it('should register a service with the given name', function () {
        ServiceRegistry.registerService(TestService, 'TestService');
        const services = ServiceRegistry.getServices();

        assert.strictEqual(services.length, 1);
        assert.strictEqual(services[0][1].name, 'TestService');
    });

    it('should return the correct service by name', function () {
        ServiceRegistry.registerService(TestService, 'TestService');
        const service = ServiceRegistry.getService('TestService');

        assert.strictEqual(service, TestService);
    });

    it('should return undefined for a non-existent service', function () {
        const service = ServiceRegistry.getService('NonExistentService');

        assert.strictEqual(service, undefined);
    });

    it('should return all registered services', function () {
        class AnotherService {}
        ServiceRegistry.registerService(TestService, 'TestService');
        ServiceRegistry.registerService(AnotherService, 'AnotherService');

        const services = ServiceRegistry.getServices();

        assert.strictEqual(services.length, 2);
        assert.strictEqual(services[0][1].name, 'TestService');
        assert.strictEqual(services[1][1].name, 'AnotherService');
    });

    it('should clear all registered services', function () {
        ServiceRegistry.registerService(TestService, 'TestService');
        ServiceRegistry.clear();

        const services = ServiceRegistry.getServices();
        assert.strictEqual(services.length, 0);
    });
});
