import { Singleton } from '../abstracts';

type TelemetryRecord = {
    id: string;
    label: string;
    startTime: number;
    endTime?: number;
};

export class Telemetry extends Singleton {
    private records: Map<string, TelemetryRecord[]> = new Map();
    private processTimer: Map<string, { start: number; end: number }> =
        new Map();
    public plugins: any[] = [];

    public static registerPlugin(plugin: any): void {
        const telemetry = Telemetry.getInstance();
        telemetry.plugins.push(plugin);
    }

    public static start(label: string, requestId?: string): void {
        if (requestId) {
            const telemetry = Telemetry.getInstance();

            if (!telemetry.records.has(requestId))
                telemetry.records.set(requestId, []);

            if (!telemetry.processTimer.has(requestId))
                telemetry.processTimer.set(requestId, {
                    start: Date.now(),
                    end: 0,
                });

            telemetry.records.get(requestId)?.push({
                id: telemetry.generateId(),
                label,
                startTime: Date.now(),
            });
        }
    }

    public static end(label: string, requestId?: string): void {
        if (requestId) {
            const telemetry = Telemetry.getInstance();
            const record = telemetry.records
                .get(requestId)
                ?.find(r => r.label === label && !r.endTime);

            if (telemetry.processTimer.has(requestId)) {
                const timer = telemetry.processTimer.get(requestId);
                timer.end = Date.now();
                telemetry.processTimer.set(requestId, timer);
            }

            if (record) record.endTime = Date.now();
        }
    }

    public static getProcessTimer(requestId?: string) {
        if (requestId) {
            const telemetry = Telemetry.getInstance();

            if (telemetry.processTimer.has(requestId)) {
                const timer = telemetry.processTimer.get(requestId);
                return timer.end - timer.start;
            }
        }

        return 0;
    }

    public static getTelemetry(requestId?: string): TelemetryRecord[] | null {
        if (requestId) {
            const telemetry = Telemetry.getInstance();
            return telemetry.records.get(requestId) || null;
        } else {
            return null;
        }
    }

    public static clearTelemetry(requestId?: string): boolean {
        if (requestId) {
            const telemetry = Telemetry.getInstance();

            if (telemetry.records.has(requestId))
                telemetry.records.delete(requestId);

            if (telemetry.processTimer.has(requestId))
                telemetry.processTimer.delete(requestId);

            return true;
        }

        return false;
    }

    public static getRecords() {
        return Telemetry.getInstance().records;
    }

    private generateId(): string {
        return (Math.random() + 1).toString(36).substring(7);
    }
}
