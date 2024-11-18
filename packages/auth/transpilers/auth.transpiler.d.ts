import { ITranspile } from '@cmmv/core';
export declare class AuthTranspile implements ITranspile {
    private logger;
    run(): void;
    generateController(): Promise<void>;
    generateService(): Promise<void>;
    generateWebSocketIntegration(): Promise<void>;
}
