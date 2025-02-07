import {
    Service,
    AbstractService,
    Config,
    IContract,
    Application,
} from '@cmmv/core';

@Service('sessions')
export class AuthSessionsService extends AbstractService {
    public async registrySession(sesssionId: string, req: any, user: string) {}
}
