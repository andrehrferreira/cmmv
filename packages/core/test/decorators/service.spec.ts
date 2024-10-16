import 'reflect-metadata';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ServiceRegistry } from '../../registries/service.registry';
import { Service } from '../../decorators/service.decorator';

describe('Service Decorator', () => {
    beforeEach(() => {
        ServiceRegistry.clear();
    });

    it('should register a service with a given name', () => {
        @Service('MyService')
        class MyService {}

        const service = ServiceRegistry.getService('MyService');
        expect(service).toBe(MyService);
    });

    it('should register a service with a default name when none is provided', () => {
        @Service()
        class MyDefaultService {}

        const serviceName = Reflect.getMetadata(
            'service_name',
            MyDefaultService,
        );
        expect(serviceName).toBe('');

        const service = ServiceRegistry.getService('');
        expect(service).toBe(MyDefaultService);
    });

    it('should return undefined for unregistered service', () => {
        const service = ServiceRegistry.getService('NonExistentService');
        expect(service).toBeUndefined();
    });

    it('should handle multiple services with different names', () => {
        @Service('ServiceOne')
        class ServiceOne {}

        @Service('ServiceTwo')
        class ServiceTwo {}

        const serviceOne = ServiceRegistry.getService('ServiceOne');
        const serviceTwo = ServiceRegistry.getService('ServiceTwo');

        expect(serviceOne).toBe(ServiceOne);
        expect(serviceTwo).toBe(ServiceTwo);
    });

    afterEach(() => {
        ServiceRegistry.clear();
    });
});
