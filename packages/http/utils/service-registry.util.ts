export class ServiceRegistry {
    private static services = new Map<any, { name: string }>();

    public static registerService(target: any, name: string) {
        if (!this.services.has(target)) 
            this.services.set(target, { name });
        else
            this.services.set(target, { ...this.services.get(target), name });
    }

    public static getServices() {
        return Array.from(this.services.entries());
    }
}

