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

    public static addToArray<T = any>(name: string, value: T): boolean {
        const scope = Scope.getInstance();
        const array = scope.data.get(name) || [];
        
        if (Array.isArray(array)) {
            array.push(value);
            scope.data.set(name, array);
            return true;
        }

        return false;
    }

    public static removeFromArray<T = any>(name: string, value: T): boolean {
        const scope = Scope.getInstance();
        const array = scope.data.get(name);
        
        if (Array.isArray(array)) {
            const index = array.indexOf(value);

            if (index > -1) {
                array.splice(index, 1);
                scope.data.set(name, array);
                return true;
            }
        }

        return false;
    }

    public static getArray<T = any>(name: string): T[] | null {
        const scope = Scope.getInstance();
        const array = scope.data.get(name);

        if (Array.isArray(array)) 
            return array as T[];
        
        return null;
    }

    public static getArrayFromIndex<T = any>(name: string, index: number): T | null {
        const scope = Scope.getInstance();
        const array = scope.data.get(name);

        if (Array.isArray(array) && array.length >= index) 
            return array[index] as T;
        
        return null;
    }
}
