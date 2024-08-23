import { ITranspile } from "./utils";

export interface IModuleOptions {
    controllers?: Array<any>; 
    transpilers?: Array<new () => ITranspile>;
    submodules?: Array<Module>;
}

export interface IModule {

}

export class Module implements IModule{
    private controllers: Array<any>;
    private transpilers: Array<new () => ITranspile>;
    private submodules: Array<Module>;

    constructor(options: IModuleOptions) {
        this.controllers = options.controllers || [];
        this.transpilers = options.transpilers || [];
        this.submodules = options.submodules || [];
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
}