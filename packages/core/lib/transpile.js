"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transpile = void 0;
const logger_1 = require("./logger");
class Transpile {
    constructor(transpilers = []) {
        this.logger = new logger_1.Logger('Transpile');
        this.transpilers = transpilers;
    }
    add(transpiler) {
        this.transpilers.push(transpiler);
    }
    async transpile() {
        try {
            const transpilePromises = this.transpilers.map(TranspilerClass => {
                const transpiler = new TranspilerClass();
                return transpiler.run();
            });
            return Promise.all(transpilePromises);
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
exports.Transpile = Transpile;
