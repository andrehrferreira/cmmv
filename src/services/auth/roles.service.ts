import { Service } from '@cmmv/core';

import { RolesServiceGenerated } from '@generated/services/auth/roles.service';

import {} from '@models/auth/roles.model';

@Service('roles')
export class RolesService extends RolesServiceGenerated {}
