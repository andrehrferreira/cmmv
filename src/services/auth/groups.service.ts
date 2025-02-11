import { Service } from '@cmmv/core';

import { GroupsServiceGenerated } from '@generated/services/auth/groups.service';

import {} from '@models/auth/groups.model';

@Service('groups')
export class GroupsService extends GroupsServiceGenerated {}
