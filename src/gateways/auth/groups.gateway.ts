import { Rpc } from '@cmmv/ws';

import { GroupsGatewayGenerated } from '@generated/gateways/auth/groups.gateway';

@Rpc('groups')
export class GroupsGateway extends GroupsGatewayGenerated {}
