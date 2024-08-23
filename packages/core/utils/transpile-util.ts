import { Logger } from "./logger-utils";

export interface ITranspile {
    run(): Promise<any>;
}

export class Transpile {
    private logger: Logger = new Logger('Transpile');
    private transpilers: Array<new () => ITranspile>;

    constructor(transpilers: Array<new () => ITranspile> = []) {
        this.transpilers = transpilers;
    }

    public add(transpiler: new () => ITranspile): void {
        this.transpilers.push(transpiler);
    }

    public async transpile(): Promise<any[]> {
        try {
            const transpilePromises = this.transpilers.map(TranspilerClass => {
                const transpiler = new TranspilerClass();
                return transpiler.run();
            });

            return Promise.all(transpilePromises);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
