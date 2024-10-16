import { describe, it, expect, beforeEach } from 'vitest';
import { ServiceRegistry } from '../../registries/service.registry';

class TestService {}

describe('ServiceRegistry', () => {
    beforeEach(() => {
        ServiceRegistry.clear();
    });

    it('should register a service with the given name', () => {
        ServiceRegistry.registerService(TestService, 'TestService');
        const services = ServiceRegistry.getServices();

        expect(services.length).toBe(1);
        expect(services[0][1].name).toBe('TestService');
    });

    it('should return the correct service by name', () => {
        ServiceRegistry.registerService(TestService, 'TestService');
        const service = ServiceRegistry.getService('TestService');

        expect(service).toBe(TestService);
    });

    it('should return undefined for a non-existent service', () => {
        const service = ServiceRegistry.getService('NonExistentService');

        expect(service).toBeUndefined();
    });

    it('should return all registered services', () => {
        class AnotherService {}
        ServiceRegistry.registerService(TestService, 'TestService');
        ServiceRegistry.registerService(AnotherService, 'AnotherService');

        const services = ServiceRegistry.getServices();

        expect(services.length).toBe(2);
        expect(services[0][1].name).toBe('TestService');
        expect(services[1][1].name).toBe('AnotherService');
    });

    it('should clear all registered services', () => {
        ServiceRegistry.registerService(TestService, 'TestService');
        ServiceRegistry.clear();

        const services = ServiceRegistry.getServices();
        expect(services.length).toBe(0);
    });
});
