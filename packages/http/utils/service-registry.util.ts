export class ServiceRegistry {
    private static services = new Map<any, { name: string }>();

    public static registerService(target: any, name: string) {
        this.services.set(target, { name });
    }

    public static getServices() {
        return Array.from(this.services.entries());
    }

    public static getServicesArr() {
        return Array.from(this.services.entries()).reduce((acc, [cls, instance]) => {
            acc[instance.name] = new cls();
            return acc;
        }, {});
    }

    public static getService(name: string) {
        for (const [target, metadata] of this.services.entries()) {
            if (metadata.name === name) 
                return target;
        }
        
        return undefined; 
    }

    public static clear() {
        this.services.clear();
    }
}
