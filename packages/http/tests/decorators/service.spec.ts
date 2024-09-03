import { strict as assert } from 'assert';
import { ServiceRegistry } from '../../utils/service-registry.util';
import { Service } from '../../decorators/service.decorator';

describe('Service Decorator', function () {

    beforeEach(function () {
        ServiceRegistry.clear();
    });

    it('should register a service with a given name', function () {
        @Service('MyService')
        class MyService {}

        const service = ServiceRegistry.getService('MyService');
        assert.strictEqual(service?.constructor, MyService);
    });

    it('should register a service with a default name when none is provided', function () {
        @Service()
        class MyDefaultService {}

        const serviceName = Reflect.getMetadata('service_name', MyDefaultService);
        assert.strictEqual(serviceName, '');

        const service = ServiceRegistry.getService('');
        assert.strictEqual(service?.constructor, MyDefaultService);
    });

    it('should return undefined for unregistered service', function () {
        const service = ServiceRegistry.getService('NonExistentService');
        assert.strictEqual(service, undefined);
    });

    it('should handle multiple services with different names', function () {
        @Service('ServiceOne')
        class ServiceOne {}

        @Service('ServiceTwo')
        class ServiceTwo {}

        const serviceOne = ServiceRegistry.getService('ServiceOne');
        const serviceTwo = ServiceRegistry.getService('ServiceTwo');

        assert.strictEqual(serviceOne?.constructor, ServiceOne);
        assert.strictEqual(serviceTwo?.constructor, ServiceTwo);
    });

    it('should replace existing service with the same name', function () {
        @Service('ReplaceService')
        class FirstService {}

        @Service('ReplaceService')
        class SecondService {}

        const service = ServiceRegistry.getService('ReplaceService');
        assert.strictEqual(service?.constructor, SecondService);
    });

    afterEach(function () {
        ServiceRegistry.clear();
    });
});
