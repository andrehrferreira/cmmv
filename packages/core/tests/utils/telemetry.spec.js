"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const telemetry_1 = require("../../lib/telemetry");
describe('Telemetry', function () {
    const requestId = 'testRequestId';
    beforeEach(function () {
        telemetry_1.Telemetry.clearTelemetry(requestId);
    });
    it('should start a telemetry record', function () {
        telemetry_1.Telemetry.start('TestLabel', requestId);
        const records = telemetry_1.Telemetry.getTelemetry(requestId);
        (0, assert_1.strict)(records);
        assert_1.strict.strictEqual(records.length, 1);
        assert_1.strict.strictEqual(records[0].label, 'TestLabel');
        assert_1.strict.strictEqual(records[0].endTime, undefined);
    });
    it('should end a telemetry record', function () {
        telemetry_1.Telemetry.start('TestLabel', requestId);
        telemetry_1.Telemetry.end('TestLabel', requestId);
        const records = telemetry_1.Telemetry.getTelemetry(requestId);
        (0, assert_1.strict)(records);
        assert_1.strict.strictEqual(records.length, 1);
        assert_1.strict.strictEqual(records[0].label, 'TestLabel');
        assert_1.strict.strictEqual(typeof records[0].endTime, 'number');
    });
    it('should not end a non-existent telemetry record', function () {
        telemetry_1.Telemetry.end('NonExistentLabel', requestId);
        const records = telemetry_1.Telemetry.getTelemetry(requestId);
        assert_1.strict.strictEqual(records, null);
    });
    it('should register a plugin', function () {
        const plugin = { name: 'TestPlugin' };
        telemetry_1.Telemetry.registerPlugin(plugin);
        const telemetryInstance = telemetry_1.Telemetry.getInstance();
        assert_1.strict.strictEqual(telemetryInstance.plugins.length, 1);
        assert_1.strict.strictEqual(telemetryInstance.plugins[0], plugin);
    });
    it('should clear telemetry records', function () {
        telemetry_1.Telemetry.start('TestLabel', requestId);
        telemetry_1.Telemetry.clearTelemetry(requestId);
        const records = telemetry_1.Telemetry.getTelemetry(requestId);
        assert_1.strict.strictEqual(records, null);
    });
    it('should generate unique ids for telemetry records', function () {
        telemetry_1.Telemetry.start('TestLabel1', requestId);
        telemetry_1.Telemetry.start('TestLabel2', requestId);
        const records = telemetry_1.Telemetry.getTelemetry(requestId);
        (0, assert_1.strict)(records);
        assert_1.strict.strictEqual(records.length, 2);
        assert_1.strict.notStrictEqual(records[0].id, records[1].id);
    });
    it('should retrieve all telemetry records', function () {
        telemetry_1.Telemetry.start('TestLabel1', requestId);
        telemetry_1.Telemetry.start('TestLabel2', requestId);
        const allRecords = telemetry_1.Telemetry.getRecords();
        (0, assert_1.strict)(allRecords);
        assert_1.strict.strictEqual(allRecords.size, 1);
        assert_1.strict.strictEqual(allRecords.get(requestId).length, 2);
    });
});
