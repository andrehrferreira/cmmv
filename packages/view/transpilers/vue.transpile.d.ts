import { ITranspile } from '@cmmv/core';
export declare class VueTranspile implements ITranspile {
    private logger;
    run(): Promise<void>;
    private generateMixins;
}
