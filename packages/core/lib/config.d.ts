import { Singleton } from '../abstracts';
export declare class Config extends Singleton {
    private config;
    static loadConfig(): void;
    static get<T = any>(key: string, defaultValue?: any): T | null | any;
    static has(key: string): boolean;
    static set(key: string, value: any): void;
    static delete(key: string): void;
    static getAll(): Record<string, any>;
    static assign(config: Record<string, any>): void;
    static clear(): void;
}
