import { Service } from '@cmmv/core';

import { UserServiceGenerated } from '@generated/services/auth/user.service';

import {} from '@models/auth/user.model';

@Service('user')
export class UserService extends UserServiceGenerated {}
