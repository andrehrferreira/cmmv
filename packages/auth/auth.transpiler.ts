import * as fs from 'node:fs';
import * as path from 'node:path';

import {
    Application,
    Config,
    ITranspile,
    Logger,
    Module,
    Scope,
    IContract,
    ServiceRegistry,
} from '@cmmv/core';

export class AuthTranspile implements ITranspile {
    private logger: Logger = new Logger('AuthTranspile');

    run(): void {
        const hasWs = Module.hasModule('ws');

        this.generateService();
        this.generateController();

        if (hasWs) this.generateWebSocketIntegration();
    }

    async generateController() {
        const outputDir = path.resolve(process.cwd(), './src/controllers/auth');
        const controllerFileName = `auth.controller.ts`;
        const localLogin = Config.get('auth.localLogin', false);
        const localRegister = Config.get('auth.localRegister', false);
        const hasRepository = Module.hasModule('repository');

        const controllerTemplate = `/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/
    
import { Auth } from "@cmmv/auth";

import { 
    Controller, Post, Body, Request, 
    Response, Get, User, Session,
    Header
} from "@cmmv/http";

import { 
    AuthService 
} from "../../services/auth/auth.service";

import { 
    LoginRequest, LoginResponse, 
    RegisterRequest, RegisterResponse 
} from "../../models/auth/user.model";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get("user")
    @Auth()
    async user(@User() user) {
        return user;
    }

    ${
        localLogin
            ? `@Post("login")
    async handlerLogin(
        @Body() payload: LoginRequest, 
        @Request() req, @Response() res, @Session() session
    ): Promise<LoginResponse> {
        const { result } = await this.authService.login(payload, req, res, session);
        return result;
    }`
            : ''
    }

    ${
        localRegister && hasRepository
            ? `@Post("register")
    async handlerRegister(@Body() payload: RegisterRequest): Promise<RegisterResponse> {
        return await this.authService.register(payload);
    }
        
    @Post("check-username")
    async handlerCheckUsername(@Body() payload: { username: string }, @Response() res) {
        const exists = await this.authService.checkUsernameExists(payload.username);
        res.type("text/json").send(exists.toString()); 
    }`
            : ''
    }

    //OPT
    @Get("opt-qrcode")
    async handlerGenerateOptSecret(@Header("authorization") token) {
        return await this.authService.generateOptSecret(token);
    }

    @Post("opt-validate-secret")
    async handlerValidateOptSecret(@Header("authorization") token, @Body() payload) {
        return await this.authService.validateOptSecret(token, payload?.secret);
    }
}`;

        if (!fs.existsSync(outputDir))
            fs.mkdirSync(outputDir, { recursive: true });

        const outputFilePath = path.join(outputDir, controllerFileName);
        fs.writeFileSync(outputFilePath, controllerTemplate, 'utf8');

        Application.appModule.controllers.push({
            name: 'AuthController',
            path: `./controllers/auth/auth.controller`,
        });
    }

    async generateService() {
        const outputDir = path.resolve(process.cwd(), './src/services/auth');
        const serviceFileName = `auth.service.ts`;

        const hasRepository = Module.hasModule('repository');
        const hasCache = Module.hasModule('cache');

        const serviceTemplate = `/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/
    
import * as crypto from 'node:crypto';
import * as jwt from "jsonwebtoken";
import * as speakeasy from "speakeasy";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { v4 as uuidv4 } from "uuid";
import { QRCodeCanvas } from '@loskir/styled-qr-code-node';
${Config.get('repository.type') === 'mongodb' ? 'import { ObjectId } from "mongodb";' : ''} 

${hasRepository ? 'import { Repository } from "@cmmv/repository";' : ''}
${hasCache ? 'import { CacheService } from "@cmmv/cache";' : ''}
import { generateFingerprint } from "@cmmv/http";

import { 
    jwtVerify,
    IJWTDecoded,
    SessionsService 
} from "@cmmv/auth";

import { 
    Telemetry, Service, Scope,
    AbstractService, Config,
    IContract, Application
} from "@cmmv/core";

import { 
    User, LoginRequest, LoginResponse, 
    RegisterRequest, RegisterResponse 
} from "@models/auth/user.model";

${
    hasRepository
        ? `import { UserEntity } from "@entities/auth/user.entity";
import { RolesEntity } from "@entities/auth/roles.entity";`
        : ''
}

@Service("auth")
export class AuthService extends AbstractService {
    ${
        hasRepository
            ? `constructor(
        private readonly sessionsService: SessionsService
    ) {
        super();

        Application.awaitService("Repository", async () => {
            const instance = Repository.getInstance();
            const contracts = Scope.getArray<any>('__contracts');
            const rolesSufixs = ["get", "insert", "update", "delete", "export"];
            const rolesNames = new Set<string>();
            
            if(!instance.dataSource)
                await Repository.loadConfig();

            contracts?.forEach((contract: IContract) => {
                if(contract.auth && contract.generateController){
                    rolesSufixs.map((sufix: string) => {
                        rolesNames.add(\`\${contract.controllerName.toLowerCase()}:\${sufix}\`);
                    })
                }
            });

            rolesNames.forEach((roleName: string) => {
                Repository.insertIfNotExists(
                    RolesEntity, 
                    { name: roleName }, "name"
                );
            });
        }, this);
    }\n`
            : ''
    }
    public async login(
        payload: LoginRequest, 
        req?: any, res?: any, 
        session?: any
    ): Promise<{ result: LoginResponse, user: any }> {
        Telemetry.start(\"AuthService::login\", req?.requestId);

        const env = Config.get<string>("env", process.env.NODE_ENV);
        const jwtToken = Config.get<string>("auth.jwtSecret");
        const expiresIn = Config.get<number>("auth.expiresIn", 60 * 60 * 24);
        const sessionEnabled = Config.get<boolean>("server.session.enabled", true);
        const cookieName = Config.get<string>(
            "server.session.options.sessionCookieName", 
            "token"
        );
        const cookieTTL = Config.get<number>(
            "server.session.options.cookie.maxAge", 
            24 * 60 * 60 * 100
        );
        const cookieSecure = Config.get<boolean>(
            "server.session.options.cookie.secure", 
            process.env.NODE_ENV !== \"dev\"
        );

        const userValidation = plainToInstance(User, payload, { 
            exposeUnsetFields: true,
            enableImplicitConversion: true,
            excludeExtraneousValues: true
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
                    token: "", 
                    message: JSON.stringify(errors[0].constraints) 
                }, 
                user: null 
            };
        }

        const sesssionId = uuidv4();
        const fingerprint = generateFingerprint(req);
        
        ${
            hasRepository
                ? `let user: any = await Repository.findBy(UserEntity, {
            username: userValidation.username,
            password: userValidation.password
        });

        if(
            !user.data && env === "dev" && 
            payload.username === "root" && 
            payload.password === "root"
        ){
            user = {
                ${Config.get('repository.type') === 'mongodb' ? `_id: new ObjectId(9999)` : `id: 9999`},
                username: payload.username,
                root: true
            } as UserEntity;
        }
        else {
            user = user.data;
        }

        if (!user) {
            return { 
                result: { 
                    success: false, 
                    token: "", 
                    message: "Invalid credentials" 
                }, 
                user: null  
            };
        }`
                : `const user = { id: 0, username: "dummyUsername", password: "dummyPasswordHash" };

        if (userValidation.password !== "dummyPasswordHash") {
            return { 
                result: { 
                    success: false, 
                    token: "", 
                    message: "Invalid credentials" 
                }, user: null };
            }
        }`
        }

        // Creating JWT token
        const token = jwt.sign({ 
            id: ${Config.get('repository.type') === 'mongodb' ? `user._id` : `user.id`},
            username: payload.username,
            fingerprint,
            root: user.root || false,
            roles: user.roles || [],
            groups: user.groups || []
        }, jwtToken, { expiresIn });

        // Recording session
        await this.sessionsService.registrySession(
            sesssionId, req, 
            ${Config.get('repository.type') === 'mongodb' ? `user._id` : `user.id`}
        );

        // Preparing session cookie
        res.cookie(cookieName, sesssionId, {
            httpOnly: true,
            secure: cookieSecure,
            sameSite: "strict",
            maxAge: cookieTTL
        });

        // Creating a session if a session plugin is active
        if(sessionEnabled && session){
            session.user = {
                id: ${Config.get('repository.type') === 'mongodb' ? `user._id` : `user.id`},
                username: payload.username,
                fingerprint,
                token,
                root: user.root || false,
                roles: user.roles || [],
                groups: user.groups || []
            };
    
            session.save();
        }
        ${hasCache ? `\nCacheService.set(\`user:\${${Config.get('repository.type') === 'mongodb' ? `user._id` : `user.id`}}\`, JSON.stringify(user), expiresIn);\n` : ''}        
        Telemetry.end("AuthService::login", req?.requestId);

        return { 
            result: { 
                success: true, 
                token, 
                message: "Login successful" 
            }, 
            user 
        };
    }

${
    hasRepository
        ? `    public async register(payload: RegisterRequest, req?: any): Promise<RegisterResponse> {
        return new Promise(async (resolve, reject) => {
            Telemetry.start("AuthService::register", req?.requestId);
            const newUser = User.fromPartial(payload); 

            this.validate(newUser).then(async (data: any) => {
                const result = await Repository.insert(UserEntity, data);
                Telemetry.end("AuthService::register", req?.requestId);

                resolve((result.success) ? 
                    { success: true, message: "User registered successfully!" } : 
                    { success: false, message: "Error trying to register new user" });
            }).catch((error) => {
                Telemetry.end("AuthService::register", req?.requestId);
                reject({ success: false, message: error.message });
            }); 
        });
    }
        
    public async checkUsernameExists(username: string): Promise<boolean> {
        if(username.length >= 3) {
            const usernameHash = crypto
                .createHash('sha1')
                .update(username)
                .digest('hex');
            
            return await Repository.exists(
                UserEntity,
                { username: usernameHash }
            );
        }
        else {
            return false;
        }
    }`
        : ``
}

    // OPT   
    public async generateOptSecret(token: string) {
        try {
            const decoded: IJWTDecoded = await jwtVerify(token);
            const issuer = Config.get("auth.optSecret.issuer", "Cmmv");
            const algorithm = Config.get("auth.optSecret.algorithm", "sha512");
            const qrCodeOptions = Config.get<object>("auth.qrCode", {});

            const account: any = await Repository.findBy(
                UserEntity, 
                Repository.queryBuilder({ 
                    id: decoded.id, 
                    optSecretVerify: true 
                })
            );

            if(account)
                throw new Error("The user already has an active OPT.");

            const defaultqrCodeOptions = {
                type: "canvas",
                shape: "square",
                width: 300,
                height: 300,
                margin: 0,
                ...qrCodeOptions,
            };

            const secret = speakeasy.generateSecret({ 
                name: issuer 
            });

            const otpUrl = speakeasy.otpauthURL({ 
                secret: secret.base32, 
                label: decoded.username || "User",
                issuer,
                algorithm
            });

            const result = await Repository.updateById(
                UserEntity, decoded.id, 
                { 
                    optSecret: secret.base32, 
                    optSecretVerify: false 
                }
            );

            if (!result) 
                throw new Error("Unable to generate QR code");
            
            const qrCode = new QRCodeCanvas({ 
                ...defaultqrCodeOptions, 
                data: otpUrl 
            });

            return qrCode.toDataUrl();
        } catch (error) {
            throw new Error(error.message || "Failed to generate OTP secret");
        }
    }

    public async validateOptSecret(token: string, secret: string) {
        try {
            const decoded: IJWTDecoded = await jwtVerify(token);

            const account: any = await Repository.findBy(
                UserEntity, 
                Repository.queryBuilder({ 
                    id: decoded.id, 
                    optSecretVerify: true 
                })
            );

            if(!account)
                throw new Error("Invalid user or without active OPT.");

            const verify = speakeasy.totp.verify({ 
                secret: account.optSecret, 
                encoding: 'base32', 
                token: secret 
            });

            if (!verify) 
                throw new Error("Invalid code");
            
            return true;
        } catch (error) {
            throw new Error(error.message || "OTP validation failed");
        }
    }

    public async updateOptSecret(token: string, secret: string) {
        try {
            const decoded: IJWTDecoded = await jwtVerify(token);

            const account: any = await Repository.findBy(
                UserEntity, 
                Repository.queryBuilder({ 
                    id: decoded.id, 
                    optSecretVerify: false 
                })
            );

            if(!account)
                throw new Error("Invalid user or without active OPT.");

            const verify = speakeasy.totp.verify({ 
                secret: account.optSecret, 
                encoding: 'base32', 
                token: secret 
            });

            if (verify) {
                const result = await Repository.updateById(
                    UserEntity, decoded.id, 
                    { 
                        optSecretVerify: true 
                    }
                );

                if (!result) 
                    throw new Error("Unable to activate OPT");

                return true;
            }
            else {
                throw new Error("Invalid code");
            }
        } catch (error) {
            throw new Error(error.message || "OTP validation failed");
        }
    }
}`;

        if (!fs.existsSync(outputDir))
            fs.mkdirSync(outputDir, { recursive: true });

        const outputFilePath = path.join(outputDir, serviceFileName);
        fs.writeFileSync(outputFilePath, serviceTemplate, 'utf8');

        Application.appModule.providers.push({
            name: 'AuthService',
            path: `./services/auth/auth.service`,
        });
    }

    async generateWebSocketIntegration() {
        const outputDir = path.resolve(process.cwd(), './src/gateways/auth');
        const wsFileName = `auth.gateway.ts`;

        const wsTemplate = `/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { Rpc, Message, Data, Socket, RpcUtils } from "@cmmv/ws";
import { AuthService } from "../../services/auth/auth.service";

import { 
    LoginRequest,
    RegisterRequest  
} from "../../models/auth/user.model";

@Rpc("auth")
export class AuthGateway {
    constructor(private readonly authService: AuthService) {}

    @Message("LoginRequest")
    async login(@Data() data: LoginRequest, @Socket() socket) {
        try{
            const { result } = await this.authService.login(data);
            const response = await RpcUtils.pack("auth", "LoginResponse", result);

            if(response)
                socket.send(response);            
        }
        catch(e){
            return null;
        }
    }

    @Message("RegisterRequest")
    async register(@Data() data: RegisterRequest, @Socket() socket) {
        try{
            const result = await this.authService.register(data);
            const response = await RpcUtils.pack("auth", "RegisterResponse", result);

            if(response)
                socket.send(response);            
        }
        catch(e){
            return null;
        }
    }
}`;

        if (!fs.existsSync(outputDir))
            fs.mkdirSync(outputDir, { recursive: true });

        const outputFilePath = path.join(outputDir, wsFileName);
        fs.writeFileSync(outputFilePath, wsTemplate, 'utf8');

        Application.appModule.providers.push({
            name: 'AuthGateway',
            path: `./gateways/auth/auth.gateway`,
        });
    }

    async mapperRoles() {}
}
