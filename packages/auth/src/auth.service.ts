import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Subject } from 'rxjs';

import {
    Application,
    Config,
    Logger,
    Scope,
    Service,
    Singleton,
    isJSON,
} from '@cmmv/core';

@Service()
export class AuthService extends Singleton {
    public logger: Logger = new Logger('AuthService');

    public static async loadConfig(application: Application): Promise<void> {
        const instance = AuthService.getInstance();
        const config = Config.get('auth');

        try {
            let strategy: new (settings?, fn?: Function) => passport.Strategy =
                config.strategy
                    ? (await import(config.strategy)).Strategy
                    : LocalStrategy;

            Application.setHTTPMiddleware(passport.initialize());
            Application.setHTTPMiddleware(passport.session());
            passport.use(
                new strategy(
                    config,
                    (accessToken, refreshToken, profile, cb) => {
                        console.log(accessToken, refreshToken, profile);
                    },
                ),
            );
        } catch (e) {
            instance.logger.error(e.message);
            console.log(e);
        }
    }
}
