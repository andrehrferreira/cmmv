import { AbstractContract } from "./abstracts";
import { ITranspile } from "./utils";

export interface IModuleOptions {
    controllers?: Array<any>; 
    providers?: Array<any>; 
    transpilers?: Array<new () => ITranspile>;
    submodules?: Array<Module>;
    contracts?: Array<new () => AbstractContract>
}

export interface IModule {

}

export class Module implements IModule{
    private controllers: Array<any>;
    private transpilers: Array<new () => ITranspile>;
    private submodules: Array<Module>;
    private contracts: Array<AbstractContract>;
    private providers: Array<any>;

    constructor(options: IModuleOptions) {
        this.providers = options.providers || [];
        this.controllers = options.controllers || [];
        this.transpilers = options.transpilers || [];
        this.submodules = options.submodules || [];
        this.contracts = options.contracts?.map(contractClass => new contractClass()) || [];
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

    public getContracts(): Array<AbstractContract>{
        return this.contracts;
    }
}