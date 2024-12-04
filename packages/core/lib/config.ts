import * as path from 'path';
import * as fs from 'fs';

import { Singleton } from '../abstracts';

import { ConfigSchema, ConfigSubPropsSchemas } from '../interfaces';

export class Config extends Singleton {
    private config: Record<string, any> = {};

    public static loadConfig(): void {
        const rootDir = process.cwd();
        const configPath = path.join(rootDir, '.cmmv.config.js');
        const configPathTest = path.join(rootDir, '.cmmv.test.js');

        if (fs.existsSync(configPath)) {
            const configModule = require(configPath);
            const instance = Config.getInstance();
            instance.config = configModule.default || configModule;
        }

        if (fs.existsSync(configPathTest)) {
            const configModuleTest = require(configPathTest);
            Config.assign(configModuleTest);
        }
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
        const instance = Config.getInstance();
        instance.config = { ...instance.config, ...config };
    }

    public static clear(): void {
        Config.getInstance().config = {};
    }

    public static async validateConfigs(
        configs: Array<ConfigSchema>,
    ): Promise<void> {
        const configInstance = Config.getInstance();
        const loadedConfig = configInstance.config;

        const validateSchema = (
            schema: ConfigSubPropsSchemas,
            config: Record<string, any>,
            path: string = '',
        ) => {
            for (const key in schema) {
                const schemaDefinition = schema[key];
                const currentPath = path ? `${path}.${key}` : key;
                const configValue = config[key];

                if (
                    schemaDefinition.required &&
                    (configValue === undefined || configValue === null)
                ) {
                    throw new Error(
                        `Configuration "${currentPath}" is required but missing.`,
                    );
                }

                if (configValue === undefined || configValue === null) continue;

                if (
                    schemaDefinition.type !== 'any' && // Allow 'any' to bypass type checking
                    typeof configValue !== schemaDefinition.type &&
                    !(
                        schemaDefinition.type === 'object' &&
                        typeof configValue === 'object'
                    )
                ) {
                    throw new Error(
                        `Configuration "${currentPath}" expects type "${schemaDefinition.type}" but received "${typeof configValue}".`,
                    );
                }

                if (
                    schemaDefinition.type === 'object' &&
                    schemaDefinition.properties
                ) {
                    if (
                        typeof configValue !== 'object' ||
                        Array.isArray(configValue)
                    ) {
                        throw new Error(
                            `Configuration "${currentPath}" expects an object but received "${typeof configValue}".`,
                        );
                    }

                    validateSchema(
                        schemaDefinition.properties,
                        configValue,
                        currentPath,
                    );
                }
            }
        };

        for (const schema of configs) {
            for (const moduleKey in schema) {
                const moduleSchema = schema[moduleKey];
                const moduleConfig = loadedConfig[moduleKey];

                if (!moduleConfig)
                    throw new Error(
                        `Module "${moduleKey}" configuration is missing.`,
                    );

                validateSchema(moduleSchema, moduleConfig, moduleKey);
            }
        }
    }
}
