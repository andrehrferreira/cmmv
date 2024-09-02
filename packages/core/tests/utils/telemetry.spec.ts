import { strict as assert } from 'assert';
import { Telemetry } from '../../utils/telemetry.util';

describe('Telemetry', function() {
    const requestId = 'testRequestId';

    beforeEach(function() {
        Telemetry.clearTelemetry(requestId);
    });

    it('should start a telemetry record', function() {
        Telemetry.start('TestLabel', requestId);

        const records = Telemetry.getTelemetry(requestId);
        assert(records);
        assert.strictEqual(records!.length, 1);
        assert.strictEqual(records![0].label, 'TestLabel');
        assert.strictEqual(records![0].endTime, undefined);
    });

    it('should end a telemetry record', function() {
        Telemetry.start('TestLabel', requestId);
        Telemetry.end('TestLabel', requestId);

        const records = Telemetry.getTelemetry(requestId);
        assert(records);
        assert.strictEqual(records!.length, 1);
        assert.strictEqual(records![0].label, 'TestLabel');
        assert.strictEqual(typeof records![0].endTime, 'number');
    });

    it('should not end a non-existent telemetry record', function() {
        Telemetry.end('NonExistentLabel', requestId);

        const records = Telemetry.getTelemetry(requestId);
        assert.strictEqual(records, null);
    });

    it('should register a plugin', function() {
        const plugin = { name: 'TestPlugin' };
        Telemetry.registerPlugin(plugin);

        const telemetryInstance = Telemetry.getInstance();
        assert.strictEqual(telemetryInstance.plugins.length, 1);
        assert.strictEqual(telemetryInstance.plugins[0], plugin);
    });

    it('should clear telemetry records', function() {
        Telemetry.start('TestLabel', requestId);
        Telemetry.clearTelemetry(requestId);

        const records = Telemetry.getTelemetry(requestId);
        assert.strictEqual(records, null);
    });

    it('should generate unique ids for telemetry records', function() {
        Telemetry.start('TestLabel1', requestId);
        Telemetry.start('TestLabel2', requestId);

        const records = Telemetry.getTelemetry(requestId);
        assert(records);
        assert.strictEqual(records!.length, 2);
        assert.notStrictEqual(records![0].id, records![1].id);
    });

    it('should retrieve all telemetry records', function() {
        Telemetry.start('TestLabel1', requestId);
        Telemetry.start('TestLabel2', requestId);

        const allRecords = Telemetry.getRecords();
        assert(allRecords);
        assert.strictEqual(allRecords.size, 1);
        assert.strictEqual(allRecords.get(requestId)!.length, 2);
    });
});
