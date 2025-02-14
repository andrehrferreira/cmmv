import { Service } from '@cmmv/core';

import { UserServiceGenerated } from '@generated/services/auth/user.service';

@Service('user')
export class UserService extends UserServiceGenerated {}
