export interface ITranspile {
    run(): void;
}
export declare class Transpile {
    private logger;
    private transpilers;
    constructor(transpilers?: Array<new () => ITranspile>);
    add(transpiler: new () => ITranspile): void;
    transpile(): Promise<any[]>;
}
