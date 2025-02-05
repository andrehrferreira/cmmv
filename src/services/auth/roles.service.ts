import { Service } from '@cmmv/core';

import { RolesServiceGenerated } from './roles.service.generated';

import {} from '../../models/auth/roles.model';

@Service('roles')
export class RolesService extends RolesServiceGenerated {}
