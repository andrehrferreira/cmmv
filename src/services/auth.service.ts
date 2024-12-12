// Generated automatically by CMMV

import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { Telemetry, Service, AbstractService, Config } from '@cmmv/core';

import { Repository } from '@cmmv/repository';
import { CacheService } from '@cmmv/cache';

import { User } from '../models/user.model';

import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from '../protos/auth';

import { UserEntity } from '../entities/user.entity';

import { ObjectId } from 'mongodb';

@Service('auth')
export class AuthService extends AbstractService {
    public async login(
        payload: LoginRequest,
        req?: any,
        res?: any,
        session?: any,
    ): Promise<{ result: LoginResponse; user: any }> {
        Telemetry.start('AuthService::login', req?.requestId);

        const env = Config.get<string>('env', process.env.NODE_ENV);
        const jwtToken = Config.get<string>('auth.jwtSecret');
        const expiresIn = Config.get<number>('auth.expiresIn', 60 * 60);
        const sessionEnabled = Config.get<boolean>(
            'server.session.enabled',
            true,
        );
        const cookieName = Config.get<string>(
            'server.session.options.sessionCookieName',
            'token',
        );
        const cookieTTL = Config.get<number>(
            'server.session.options.cookie.maxAge',
            24 * 60 * 60 * 100,
        );
        const cookieSecure = Config.get<boolean>(
            'server.session.options.cookie.secure',
            process.env.NODE_ENV !== 'dev',
        );

        const userValidation = plainToClass(User, payload, {
            exposeUnsetFields: true,
            enableImplicitConversion: true,
        });

        let user = await Repository.findBy(UserEntity, userValidation);

        if (
            !user &&
            env === 'dev' &&
            payload.username === 'root' &&
            payload.password === 'root'
        ) {
            user = {
                _id: new ObjectId(9999),
                username: payload.username,
                root: true,
            } as UserEntity;
        }

        if (!user)
            return {
                result: {
                    success: false,
                    token: '',
                    message: 'Invalid credentials',
                },
                user: null,
            };

        const token = jwt.sign(
            {
                id: user._id,
                username: payload.username,
                root: user.root,
                roles: user.roles || [],
                groups: user.groups || [],
            },
            jwtToken,
            { expiresIn },
        );

        res.cookie(cookieName, `Bearer ${token}`, {
            httpOnly: true,
            secure: cookieSecure,
            sameSite: 'strict',
            maxAge: cookieTTL,
        });

        if (sessionEnabled && session) {
            session.user = {
                username: payload.username,
                token: token,
            };

            session.save();
        }

        CacheService.set(`user:${user._id}`, JSON.stringify(user), expiresIn);

        Telemetry.end('AuthService::login', req?.requestId);
        return {
            result: { success: true, token, message: 'Login successful' },
            user,
        };
    }

    public async register(
        payload: RegisterRequest,
        req?: any,
    ): Promise<RegisterResponse> {
        Telemetry.start('AuthService::register', req?.requestId);

        const newUser = plainToClass(User, payload, {
            exposeUnsetFields: true,
            enableImplicitConversion: true,
        });

        const errors = await validate(newUser, { skipMissingProperties: true });

        if (errors.length > 0) {
            console.error(errors);
            Telemetry.end('AuthService::register', req?.requestId);
            return {
                success: false,
                message: JSON.stringify(errors[0].constraints),
            };
        } else {
            try {
                const result = await Repository.insert<UserEntity>(
                    UserEntity,
                    newUser,
                );
                Telemetry.end('AuthService::register', req?.requestId);

                return result
                    ? {
                          success: true,
                          message: 'User registered successfully!',
                      }
                    : {
                          success: false,
                          message: 'Error trying to register new user',
                      };
            } catch (e) {
                console.error(e);
                Telemetry.end('AuthService::register', req?.requestId);
                return { success: false, message: e.message };
            }
        }
    }
}
