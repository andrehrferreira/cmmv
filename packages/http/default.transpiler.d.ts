import { ITranspile } from '@cmmv/core';
export declare class DefaultHTTPTranspiler implements ITranspile {
    private logger;
    run(): void;
    private generateService;
    private generateController;
    private generateModule;
}
