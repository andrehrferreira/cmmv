import { Service } from '@cmmv/core';

import { RulesServiceGenerated } from './rules.service.generated';

import {} from '../../models/auth/rules.model';

@Service('rules')
export class RulesService extends RulesServiceGenerated {}
