"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Telemetry = void 0;
const abstracts_1 = require("../abstracts");
class Telemetry extends abstracts_1.Singleton {
    constructor() {
        super(...arguments);
        this.records = new Map();
        this.plugins = [];
    }
    static registerPlugin(plugin) {
        const telemetry = Telemetry.getInstance();
        telemetry.plugins.push(plugin);
    }
    static start(label, requestId) {
        if (requestId) {
            const telemetry = Telemetry.getInstance();
            if (!telemetry.records.has(requestId))
                telemetry.records.set(requestId, []);
            telemetry.records
                .get(requestId)
                ?.push({
                id: telemetry.generateId(),
                label,
                startTime: Date.now(),
            });
        }
    }
    static end(label, requestId) {
        if (requestId) {
            const telemetry = Telemetry.getInstance();
            const record = telemetry.records
                .get(requestId)
                ?.find(r => r.label === label && !r.endTime);
            if (record)
                record.endTime = Date.now();
        }
    }
    static getTelemetry(requestId) {
        if (requestId) {
            const telemetry = Telemetry.getInstance();
            return telemetry.records.get(requestId) || null;
        }
        else {
            return null;
        }
    }
    static clearTelemetry(requestId) {
        if (requestId) {
            const telemetry = Telemetry.getInstance();
            if (telemetry.records.has(requestId))
                return telemetry.records.delete(requestId);
        }
        return false;
    }
    static getRecords() {
        return Telemetry.getInstance().records;
    }
    generateId() {
        return (Math.random() + 1).toString(36).substring(7);
    }
}
exports.Telemetry = Telemetry;
