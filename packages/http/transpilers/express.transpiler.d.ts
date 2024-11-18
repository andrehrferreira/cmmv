import { ITranspile } from '@cmmv/core';
export declare class ExpressTranspile implements ITranspile {
    private logger;
    run(): void;
    private generateService;
    private generateController;
    private generateModule;
}
