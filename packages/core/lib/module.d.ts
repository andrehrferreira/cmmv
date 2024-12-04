import { AbstractContract } from '../abstracts';
import { ITranspile } from './transpile';
import { ConfigSchema } from '../interfaces/config-shema.interface';
export interface IModuleOptions {
    controllers?: Array<any>;
    providers?: Array<any>;
    transpilers?: Array<new () => ITranspile>;
    submodules?: Array<Module>;
    contracts?: Array<new () => AbstractContract>;
    configs?: Array<ConfigSchema>;
}
export interface IModule {
    getControllers(): Array<any>;
    getTranspilers(): Array<new () => ITranspile>;
    getSubmodules(): Array<Module>;
    getContracts(): Array<AbstractContract>;
    getProviders(): Array<any>;
    getConfigsSchemas(): Array<any>;
}
export declare class Module implements IModule {
    static modules: Map<string, Module>;
    private controllers;
    private transpilers;
    private submodules;
    private contracts;
    private providers;
    private configs;
    constructor(name: string, options: IModuleOptions);
    static hasModule(name: string): boolean;
    static getModule(name: string): Module | null;
    static loadTranspile<T>(transpileRaw: new () => ITranspile): T;
    getControllers(): Array<any>;
    getTranspilers(): Array<new () => ITranspile>;
    getSubmodules(): Array<Module>;
    getContracts(): Array<any>;
    getProviders(): Array<any>;
    getConfigsSchemas(): Array<any>;
}
