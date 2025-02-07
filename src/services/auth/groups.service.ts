import { Service } from '@cmmv/core';

import { GroupsServiceGenerated } from './groups.service.generated';

import {} from '../../models/auth/groups.model';

@Service('groups')
export class GroupsService extends GroupsServiceGenerated {}
