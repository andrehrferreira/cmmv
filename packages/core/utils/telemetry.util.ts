import { Singleton } from "../abstracts";

type TelemetryRecord = {
    id: string;
    label: string;
    startTime: number;
    endTime?: number;
};

export class Telemetry extends Singleton {
    private records: Map<string, TelemetryRecord[]> = new Map();
    private plugins: any[] = [];

    public static start(label: string, requestId: string): void {
        const telemetry = Telemetry.getInstance();

        if (!telemetry.records.has(requestId)) 
            telemetry.records.set(requestId, []);
        
        telemetry.records.get(requestId)?.push({ id: telemetry.generateId(), label, startTime: Date.now() });
    }

    public static end(label: string, requestId: string): void {
        const telemetry = Telemetry.getInstance();
        const record = telemetry.records.get(requestId)?.find(r => r.label === label && !r.endTime);

        if (record) 
            record.endTime = Date.now();
    }

    public static registerPlugin(plugin: any): void {
        const telemetry = Telemetry.getInstance();
        telemetry.plugins.push(plugin);
    }

    public static getTelemetry(requestId: string): TelemetryRecord[] | null {
        const telemetry = Telemetry.getInstance();
        return telemetry.records.get(requestId) || null;
    }

    public static clearTelemetry(requestId: string): void {
        const telemetry = Telemetry.getInstance();
        telemetry.records.delete(requestId);
    }

    public static getRecords(){
        const telemetry = Telemetry.getInstance();
        return telemetry.records;
    }

    private generateId(): string {
        return (Math.random() + 1).toString(36).substring(7);
    }
}
