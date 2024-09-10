// Generated automatically by CMMV

import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { Telemetry, Service, AbstractService, Config } from '@cmmv/core';

import { Repository } from '@cmmv/repository';

import { User, IUser } from '../models/user.model';
import { LoginRequest, LoginResponse } from '../protos/auth';
import { UserEntity } from '../entities/user.entity';

@Service('auth')
export class AuthService extends AbstractService {
    public async login(payload: LoginRequest): Promise<LoginResponse> {
        Telemetry.start('AuthService::login');

        const jwtToken = Config.get('auth.jwtSecret');
        const { username, password } = payload;

        const user = await Repository.findBy(UserEntity, {
            username,
            password,
        });

        if (!user || user.password !== password)
            return {
                success: false,
                token: '',
                message: 'Invalid credentials',
            };

        const token = jwt.sign(
            {
                id: user.id,
            },
            jwtToken,
            { algorithm: 'RS256' },
        );

        Telemetry.end('AuthService::login');
        return { success: true, token, message: 'Login successful' };
    }
}
