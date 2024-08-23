import { Singleton } from "../abstracts";

export class Scope extends Singleton {
    private data: Map<string, any> = new Map();

    public static set(name: string, data: any): boolean {
        const scope = Scope.getInstance();

        if (!scope.data.has(name)) {
            scope.data.set(name, data);
            return true;
        }

        return false;
    }

    public static has(name: string): boolean {
        const scope = Scope.getInstance();
        return scope.data.has(name);
    }

    public static get<T = any>(name: string): T | null {
        const scope = Scope.getInstance();
        return scope.data.has(name) ? (scope.data.get(name) as T) : null;
    }

    public static clear(name: string): void {
        const scope = Scope.getInstance();
        scope.data.delete(name);
    }
}
