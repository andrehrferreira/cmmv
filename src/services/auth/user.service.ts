import { Service } from '@cmmv/core';

import { UserServiceGenerated } from './user.service.generated';

import {} from '../../models/auth/user.model';

@Service('user')
export class UserService extends UserServiceGenerated {}
