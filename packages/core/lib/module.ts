import { AbstractContract } from '../abstracts';
import { ITranspile } from './transpile';

export interface IModuleOptions {
    controllers?: Array<any>;
    providers?: Array<any>;
    transpilers?: Array<new () => ITranspile>;
    submodules?: Array<Module>;
    contracts?: Array<new () => AbstractContract>;
}

export interface IModule {
    getControllers(): Array<any>;
    getTranspilers(): Array<new () => ITranspile>;
    getSubmodules(): Array<Module>;
    getContracts(): Array<AbstractContract>;
    getProviders(): Array<any>;
}

export class Module implements IModule {
    public static modules: Map<string, Module> = new Map<string, Module>();

    private controllers: Array<any>;
    private transpilers: Array<new () => ITranspile>;
    private submodules: Array<Module>;
    private contracts: Array<any>;
    private providers: Array<any>;

    constructor(name: string, options: IModuleOptions) {
        this.providers = options.providers || [];
        this.controllers = options.controllers || [];
        this.transpilers = options.transpilers || [];
        this.submodules = options.submodules || [];
        this.contracts =
            options.contracts?.map(contractClass => new contractClass()) || [];
        Module.modules.set(name, this);
    }

    public static hasModule(name: string): boolean {
        return Module.modules.has(name);
    }

    public static getModule(name: string): Module | null {
        return Module.modules.has(name) ? Module.modules.get(name) : null;
    }

    public getControllers(): Array<any> {
        return this.controllers;
    }

    public getTranspilers(): Array<new () => ITranspile> {
        return this.transpilers;
    }

    public getSubmodules(): Array<Module> {
        return this.submodules;
    }

    public getContracts(): Array<any> {
        return this.contracts;
    }

    public getProviders(): Array<any> {
        return this.providers;
    }
}
