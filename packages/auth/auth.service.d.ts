import { Application, Logger, Singleton } from '@cmmv/core';
export declare class AuthService extends Singleton {
    logger: Logger;
    static loadConfig(application: Application): Promise<void>;
}
