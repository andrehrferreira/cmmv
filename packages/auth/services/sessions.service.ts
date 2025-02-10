import {
    Service,
    AbstractService,
    Config,
    IContract,
    Application,
    Module,
} from '@cmmv/core';

import { Repository } from '@cmmv/repository';
import { IJWTDecoded } from '../lib';

@Service('sessions')
export class AuthSessionsService extends AbstractService {
    private extractDevice(userAgent: string): string {
        if (/mobile/i.test(userAgent)) return 'Mobile';
        if (/tablet/i.test(userAgent)) return 'Tablet';
        return 'Desktop';
    }

    private extractBrowser(userAgent: string): string {
        if (/chrome/i.test(userAgent)) return 'Chrome';
        if (/firefox/i.test(userAgent)) return 'Firefox';
        if (/safari/i.test(userAgent)) return 'Safari';
        if (/edge/i.test(userAgent)) return 'Edge';
        if (/opera|opr/i.test(userAgent)) return 'Opera';
        return 'Unknown';
    }

    private extractOS(userAgent: string): string {
        if (/windows/i.test(userAgent)) return 'Windows';
        if (/mac/i.test(userAgent)) return 'MacOS';
        if (/linux/i.test(userAgent)) return 'Linux';
        if (/android/i.test(userAgent)) return 'Android';
        if (/ios|iphone|ipad/i.test(userAgent)) return 'iOS';
        return 'Unknown';
    }

    public async registrySession(
        sessionId: string,
        req: any,
        fingerprint: string,
        user: string,
    ) {
        const SessionsEntity = Repository.getEntity('SessionsEntity');
        const hasCacheModule = Module.hasModule('cache');
        const ipAddress =
            req.ip ||
            req.get('x-forwarded-for') ||
            req.connection.remoteAddress;
        const userAgent = req.get('user-agent') || 'Unknown';
        const device = this.extractDevice(userAgent);
        const browser = this.extractBrowser(userAgent);
        const os = this.extractOS(userAgent);

        let session = await Repository.findBy(
            SessionsEntity,
            Repository.queryBuilder({ fingerprint }),
        );

        if (session) {
            const result = await Repository.update(
                SessionsEntity,
                Repository.queryBuilder({ fingerprint }),
                {
                    ipAddress,
                    device,
                    browser,
                    os,
                    updatedAt: new Date(),
                    userAgent,
                },
            );

            if (!result) throw new Error('Failed to update session');

            return;
        }

        const newSession = {
            uuid: sessionId,
            fingerprint,
            user,
            ipAddress,
            device,
            browser,
            os,
            revoked: false,
            userAgent,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await Repository.insert(SessionsEntity, newSession);

        if (hasCacheModule) {
        }

        if (!result.success) throw new Error('Failed to create session');
    }

    public async getSessions(queries: any, user: IJWTDecoded) {
        const SessionsEntity = Repository.getEntity('SessionsEntity');
        let userId: any = user.id;

        if (Config.get('repository.type') === 'mongodb') {
            const { ObjectId } = await import('mongodb');
            userId = new ObjectId(userId as string);
        }

        let session = await Repository.findAll(
            SessionsEntity,
            Repository.queryBuilder({ user: userId, ...queries }),
        );

        if (!session) throw new Error('Unable to load sessions for this user.');

        return session;
    }
}
