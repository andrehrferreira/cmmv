/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

import {
    Telemetry,
    Service,
    Scope,
    AbstractService,
    Config,
    IContract,
    Application,
} from '@cmmv/core';

import { generateFingerprint } from '@cmmv/http';

import { Repository } from '@cmmv/repository';

import {
    User,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from '../../models/auth/user.model';

import { UserEntity } from '../../entities/auth/user.entity';
import { RolesEntity } from '../../entities/auth/roles.entity';

import { ObjectId } from 'mongodb';

@Service('auth')
export class AuthService extends AbstractService {
    constructor() {
        super();

        Application.awaitService(
            'Repository',
            async () => {
                const instance = Repository.getInstance();
                const contracts = Scope.getArray<any>('__contracts');
                const rolesSufixs = [
                    'get',
                    'insert',
                    'update',
                    'delete',
                    'export',
                ];
                const rolesNames = new Set<string>();

                if (!instance.dataSource) await Repository.loadConfig();

                contracts?.forEach((contract: IContract) => {
                    if (contract.auth && contract.generateController) {
                        rolesSufixs.map((sufix: string) => {
                            rolesNames.add(
                                `${contract.controllerName.toLowerCase()}:${sufix}`,
                            );
                        });
                    }
                });

                rolesNames.forEach((roleName: string) => {
                    Repository.insertIfNotExists(
                        RolesEntity,
                        { name: roleName },
                        'name',
                    );
                });
            },
            this,
        );
    }

    public async login(
        payload: LoginRequest,
        req?: any,
        res?: any,
        session?: any,
    ): Promise<{ result: LoginResponse; user: any }> {
        Telemetry.start('AuthService::login', req?.requestId);

        const env = Config.get<string>('env', process.env.NODE_ENV);
        const jwtToken = Config.get<string>('auth.jwtSecret');
        const expiresIn = Config.get<number>('auth.expiresIn', 60 * 60 * 24);
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

        const userValidation = plainToInstance(User, payload, {
            exposeUnsetFields: true,
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });

        const errors = await validate(userValidation, {
            forbidUnknownValues: false,
            skipMissingProperties: true,
            stopAtFirstError: true,
        });

        if (errors.length > 0) {
            return {
                result: {
                    success: false,
                    token: '',
                    message: JSON.stringify(errors[0].constraints),
                },
                user: null,
            };
        }

        const sesssionId = uuidv4();
        const fingerprint = generateFingerprint(req);

        let user: any = await Repository.findBy(UserEntity, {
            username: userValidation.username,
            password: userValidation.password,
        });

        if (
            !user.data &&
            env === 'dev' &&
            payload.username === 'root' &&
            payload.password === 'root'
        ) {
            user = {
                _id: new ObjectId(9999),
                username: payload.username,
                root: true,
            } as UserEntity;
        } else {
            user = user.data;
        }

        if (!user) {
            return {
                result: {
                    success: false,
                    token: '',
                    message: 'Invalid credentials',
                },
                user: null,
            };
        }

        const token = jwt.sign(
            {
                id: user._id,
                fingerprint,
                root: user.root || false,
                roles: user.roles || [],
                groups: user.groups || [],
            },
            jwtToken,
            { expiresIn },
        );

        res.cookie(cookieName, sesssionId, {
            httpOnly: true,
            secure: cookieSecure,
            sameSite: 'strict',
            maxAge: cookieTTL,
        });

        if (sessionEnabled && session) {
            session.user = {
                id: user._id,
                username: payload.username,
                fingerprint,
                token,
                root: user.root || false,
                roles: user.roles || [],
                groups: user.groups || [],
            };

            session.save();
        }

        Telemetry.end('AuthService::login', req?.requestId);

        return {
            result: {
                success: true,
                token,
                message: 'Login successful',
            },
            user,
        };
    }

    public async register(
        payload: RegisterRequest,
        req?: any,
    ): Promise<RegisterResponse> {
        Telemetry.start('AuthService::register', req?.requestId);

        const newUser = plainToInstance(User, payload, {
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
