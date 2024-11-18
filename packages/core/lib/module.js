"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
class Module {
    constructor(name, options) {
        this.providers = options.providers || [];
        this.controllers = options.controllers || [];
        this.transpilers = options.transpilers || [];
        this.submodules = options.submodules || [];
        this.contracts =
            options.contracts?.map(contractClass => new contractClass()) || [];
        Module.modules.set(name, this);
    }
    static hasModule(name) {
        return Module.modules.has(name);
    }
    static getModule(name) {
        return Module.modules.has(name) ? Module.modules.get(name) : null;
    }
    static loadTranspile(transpileRaw) {
        const transpile = new transpileRaw();
        return transpile;
    }
    getControllers() {
        return this.controllers;
    }
    getTranspilers() {
        return this.transpilers;
    }
    getSubmodules() {
        return this.submodules;
    }
    getContracts() {
        return this.contracts;
    }
    getProviders() {
        return this.providers;
    }
}
exports.Module = Module;
Module.modules = new Map();
