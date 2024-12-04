import {
    Application,
    Config,
    Logger,
    Scope,
    Service,
    Singleton,
} from '@cmmv/core';

@Service()
export class AuthService extends Singleton {
    public logger: Logger = new Logger('AuthService');

    public static async loadConfig(application: Application): Promise<void> {
        const instance = AuthService.getInstance();
        const config = Config.get('auth');

        try {
        } catch (e) {
            instance.logger.error(e.message);
            console.log(e);
        }
    }
}
