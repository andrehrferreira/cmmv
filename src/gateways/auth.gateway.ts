// Generated automatically by CMMV

import { Rpc, Message, Data, Socket, RpcUtils } from '@cmmv/ws';
import { AuthService } from '../services/auth.service';

import { LoginRequest, RegisterRequest } from '../protos/auth';

@Rpc('auth')
export class AuthGateway {
    constructor(private readonly authService: AuthService) {}

    @Message('LoginRequest')
    async login(@Data() data: LoginRequest, @Socket() socket) {
        try {
            const { result } = await this.authService.login(data);
            const response = await RpcUtils.pack(
                'auth',
                'LoginResponse',
                result,
            );

            if (response) socket.send(response);
        } catch (e) {
            return null;
        }
    }

    @Message('RegisterRequest')
    async register(@Data() data: RegisterRequest, @Socket() socket) {
        try {
            const result = await this.authService.register(data);
            const response = await RpcUtils.pack(
                'auth',
                'RegisterResponse',
                result,
            );

            if (response) socket.send(response);
        } catch (e) {
            return null;
        }
    }
}
