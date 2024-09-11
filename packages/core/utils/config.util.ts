import * as path from 'path';
import * as fs from 'fs';

import { Singleton } from '../abstracts';

export class Config extends Singleton {
    private config: Record<string, any> = {};

    public static loadConfig(): void {
        const rootDir = process.cwd();
        const configPath = path.join(rootDir, '.cmmv.config.js');

        if (!fs.existsSync(configPath))
            throw new Error(`Configuration file not found: ${configPath}`);

        const configModule = require(configPath);
        const instance = Config.getInstance();
        instance.config = configModule.default || configModule;
    }

    public static get<T = any>(
        key: string,
        defaultValue?: any,
    ): T | null | any {
        const config = Config.getInstance();
        const value = key
            .split('.')
            .reduce(
                (o, k) =>
                    o && o[k] !== undefined && o[k] !== null ? o[k] : null,
                config.config,
            ) as T;
        return value ? value : defaultValue;
    }

    public static has(key: string): boolean {
        const config = Config.getInstance();
        return (
            key
                .split('.')
                .reduce(
                    (o, k) => (o && k in o ? o[k] : undefined),
                    config.config,
                ) !== undefined
        );
    }

    public static set(key: string, value: any): void {
        const config = Config.getInstance();
        const keys = key.split('.');
        let obj = config.config;

        while (keys.length > 1) {
            const k = keys.shift()!;
            obj[k] = obj[k] || {};
            obj = obj[k];
        }

        obj[keys[0]] = value;
    }

    public static delete(key: string): void {
        const config = Config.getInstance();
        const keys = key.split('.');
        let obj = config.config;

        while (keys.length > 1) {
            const k = keys.shift()!;
            if (!(k in obj)) return;
            obj = obj[k];
        }

        delete obj[keys[0]];
    }

    public static getAll(): Record<string, any> {
        return Config.getInstance().config;
    }

    public static assign(config: Record<string, any>): void {
        Config.getInstance().config = config;
    }

    public static clear(): void {
        Config.getInstance().config = {};
    }
}
