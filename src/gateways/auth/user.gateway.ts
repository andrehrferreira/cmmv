import { Rpc } from '@cmmv/ws';

import { UserGatewayGenerated } from '@generated/gateways/auth/user.gateway';

@Rpc('user')
export class UserGateway extends UserGatewayGenerated {}
