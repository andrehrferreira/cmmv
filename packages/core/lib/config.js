"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const path = require("path");
const fs = require("fs");
const abstracts_1 = require("../abstracts");
class Config extends abstracts_1.Singleton {
    constructor() {
        super(...arguments);
        this.config = {};
    }
    static loadConfig() {
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
    static get(key, defaultValue) {
        const config = Config.getInstance();
        const value = key
            .split('.')
            .reduce((o, k) => o && o[k] !== undefined && o[k] !== null ? o[k] : null, config.config);
        return value ? value : defaultValue;
    }
    static has(key) {
        const config = Config.getInstance();
        return (key
            .split('.')
            .reduce((o, k) => (o && k in o ? o[k] : undefined), config.config) !== undefined);
    }
    static set(key, value) {
        const config = Config.getInstance();
        const keys = key.split('.');
        let obj = config.config;
        while (keys.length > 1) {
            const k = keys.shift();
            obj[k] = obj[k] || {};
            obj = obj[k];
        }
        obj[keys[0]] = value;
    }
    static delete(key) {
        const config = Config.getInstance();
        const keys = key.split('.');
        let obj = config.config;
        while (keys.length > 1) {
            const k = keys.shift();
            if (!(k in obj))
                return;
            obj = obj[k];
        }
        delete obj[keys[0]];
    }
    static getAll() {
        return Config.getInstance().config;
    }
    static assign(config) {
        const instance = Config.getInstance();
        instance.config = { ...instance.config, ...config };
    }
    static clear() {
        Config.getInstance().config = {};
    }
}
exports.Config = Config;
