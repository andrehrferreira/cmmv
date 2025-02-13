import { Service } from '@cmmv/core';

import { GroupsServiceGenerated } from '@generated/services/auth/groups.service';

@Service('groups')
export class GroupsService extends GroupsServiceGenerated {}
