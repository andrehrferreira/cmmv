import { describe, it, expect, beforeEach } from 'vitest';
import { Telemetry } from '../../lib/telemetry';

describe('Telemetry', () => {
    const requestId = 'testRequestId';

    beforeEach(() => {
        Telemetry.clearTelemetry(requestId);
    });

    it('should start a telemetry record', () => {
        Telemetry.start('TestLabel', requestId);

        const records = Telemetry.getTelemetry(requestId);
        expect(records).toBeTruthy();
        expect(records!.length).toBe(1);
        expect(records![0].label).toBe('TestLabel');
        expect(records![0].endTime).toBeUndefined();
    });

    it('should end a telemetry record', () => {
        Telemetry.start('TestLabel', requestId);
        Telemetry.end('TestLabel', requestId);

        const records = Telemetry.getTelemetry(requestId);
        expect(records).toBeTruthy();
        expect(records!.length).toBe(1);
        expect(records![0].label).toBe('TestLabel');
        expect(typeof records![0].endTime).toBe('number');
    });

    it('should not end a non-existent telemetry record', () => {
        Telemetry.end('NonExistentLabel', requestId);

        const records = Telemetry.getTelemetry(requestId);
        expect(records).toBeNull();
    });

    it('should register a plugin', () => {
        const plugin = { name: 'TestPlugin' };
        Telemetry.registerPlugin(plugin);

        const telemetryInstance = Telemetry.getInstance();
        expect(telemetryInstance.plugins.length).toBe(1);
        expect(telemetryInstance.plugins[0]).toBe(plugin);
    });

    it('should clear telemetry records', () => {
        Telemetry.start('TestLabel', requestId);
        Telemetry.clearTelemetry(requestId);

        const records = Telemetry.getTelemetry(requestId);
        expect(records).toBeNull();
    });

    it('should generate unique ids for telemetry records', () => {
        Telemetry.start('TestLabel1', requestId);
        Telemetry.start('TestLabel2', requestId);

        const records = Telemetry.getTelemetry(requestId);
        expect(records).toBeTruthy();
        expect(records!.length).toBe(2);
        expect(records![0].id).not.toBe(records![1].id);
    });

    it('should retrieve all telemetry records', () => {
        Telemetry.start('TestLabel1', requestId);
        Telemetry.start('TestLabel2', requestId);

        const allRecords = Telemetry.getRecords();
        expect(allRecords).toBeTruthy();
        expect(allRecords.size).toBe(1);
        expect(allRecords.get(requestId)!.length).toBe(2);
    });
});
