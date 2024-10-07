import * as fs from 'node:fs';
import * as path from 'node:path';

import { Application, Config, ITranspile, Logger, Module } from '@cmmv/core';

export class AuthTranspile implements ITranspile {
    private logger: Logger = new Logger('AuthTranspile');

    run(): void {
        const hasWs = Module.hasModule('ws');

        this.generateService();
        this.generateController();

        if (hasWs) this.generateWebSocketIntegration();
    }

    async generateController() {
        const outputDir = path.resolve(process.cwd(), './src/controllers');
        const controllerFileName = `auth.controller.ts`;
        const localLogin = Config.get('auth.localLogin', false);
        const localRegister = Config.get('auth.localRegister', false);
        const hasRepository = Module.hasModule('repository');

        const controllerTemplate = `// Generated automatically by CMMV
    
import { Config } from "@cmmv/core";
import { Auth } from "@cmmv/auth";

import { 
    Controller, Post, Body, Req, 
    Res, Get, Session
} from "@cmmv/http";

import { AuthService } from '../services/auth.service';

import { 
    LoginRequest, LoginResponse, 
    RegisterRequest, RegisterResponse 
} from '../protos/auth';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get("user")
    @Auth()
    async user(@Req() req) {
        return req.user;
    }

    ${
        localLogin
            ? `@Post("login")
    async login(
        @Body() payload: LoginRequest, 
        @Req() req, @Res() res, @Session() session
    ): Promise<LoginResponse> {
        const { result } = await this.authService.login(payload, req, res, session);
        return result;
    }`
            : ''
    }

    ${
        localRegister && hasRepository
            ? `@Post("register")
    async register(@Body() payload: RegisterRequest): Promise<RegisterResponse> {
        return await this.authService.register(payload);
    }`
            : ''
    }
}`;

        if (!fs.existsSync(outputDir))
            fs.mkdirSync(outputDir, { recursive: true });

        const outputFilePath = path.join(outputDir, controllerFileName);
        fs.writeFileSync(outputFilePath, controllerTemplate, 'utf8');

        Application.appModule.controllers.push({
            name: 'AuthController',
            path: `./controllers/auth.controller`,
        });
    }

    async generateService() {
        const config = Config.get('auth');
        const outputDir = path.resolve(process.cwd(), './src/services');
        const serviceFileName = `auth.service.ts`;

        const hasRepository = Module.hasModule('repository');
        const hasCache = Module.hasModule('cache');

        const serviceTemplate = `// Generated automatically by CMMV
    
import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { 
    Telemetry, Service, 
    AbstractService, Config
} from "@cmmv/core";

${hasRepository ? "import { Repository } from '@cmmv/repository';" : ''}
${hasCache ? "import { CacheService } from '@cmmv/cache';" : ''}

import { User } from '../models/user.model';

import { 
    LoginRequest, LoginResponse, 
    RegisterRequest, RegisterResponse 
} from '../protos/auth';

${hasRepository ? "import { UserEntity } from '../entities/user.entity';" : ''}

@Service("auth")
export class AuthService extends AbstractService {
    public async login(
        payload: LoginRequest, 
        req?: any, res?: any, 
        session?: any
    ): Promise<{ result: LoginResponse, user: any }> {
        Telemetry.start('AuthService::login', req?.requestId);

        const jwtToken = Config.get<string>("auth.jwtSecret");
        const expiresIn = Config.get<number>("auth.expiresIn", 60 * 60);
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
            process.env.NODE_ENV !== 'dev'
        );

        const userValidation = plainToClass(User, payload, { 
            exposeUnsetFields: true,
            enableImplicitConversion: true
        }); 

        ${
            hasRepository
                ? `const user = await Repository.findBy(UserEntity, userValidation);;

        if (!user) 
            return { result: { success: false, token: "", message: "Invalid credentials" }, user: null  };`
                : `const user = { id: 0, username: "dummyUsername", password: "dummyPasswordHash" };
        if (userValidation.password !== "dummyPasswordHash") 
            return { result: { success: false, token: "", message: "Invalid credentials" }, user: null };`
        }

        const token = jwt.sign({ 
            id: user.id,
            username: payload.username 
        }, jwtToken, { expiresIn });

        res.cookie(cookieName, \`Bearer \${token}\`, {
            httpOnly: true,
            secure: cookieSecure,
            sameSite: 'strict',
            maxAge: cookieTTL
        });

        if(sessionEnabled){
            session.user = {
                username: payload.username,
                token: token,
            };
    
            session.save();
        }

        ${hasCache ? `CacheService.set(\`user:\${user.id}\`, JSON.stringify(user), expiresIn);\n` : ''}        
        Telemetry.end('AuthService::login', req?.requestId);        
        return { result: { success: true, token, message: "Login successful" }, user };
    }

${
    hasRepository
        ? `    public async register(payload: RegisterRequest, req?: any): Promise<RegisterResponse> {
        Telemetry.start('AuthService::register', req?.requestId);

        const newUser = plainToClass(User, payload, { 
            exposeUnsetFields: true,
            enableImplicitConversion: true
        }); 

        const errors = await validate(newUser, { skipMissingProperties: true });
        
        if (errors.length > 0) {
            console.error(errors);
            Telemetry.end('AuthService::register', req?.requestId);
            return { success: false, message: JSON.stringify(errors[0].constraints) };
        } 
        else {    
            try{
                const result = await Repository.insert<UserEntity>(UserEntity, newUser);
                Telemetry.end('AuthService::register', req?.requestId);

                return (result) ? 
                    { success: true, message: "User registered successfully!" } : 
                    { success: false, message: "Error trying to register new user" };
            }   
            catch(e){
                console.error(e);
                Telemetry.end('AuthService::register', req?.requestId);
                return { success: false, message: e.message };
            }                                                    
        }
    }`
        : ``
}
}`;

        if (!fs.existsSync(outputDir))
            fs.mkdirSync(outputDir, { recursive: true });

        const outputFilePath = path.join(outputDir, serviceFileName);
        fs.writeFileSync(outputFilePath, serviceTemplate, 'utf8');

        Application.appModule.providers.push({
            name: 'AuthService',
            path: `./services/auth.service`,
        });
    }

    async generateWebSocketIntegration() {
        const outputDir = path.resolve(process.cwd(), './src/gateways');
        const wsFileName = `auth.gateway.ts`;

        const wsTemplate = `// Generated automatically by CMMV

import { Rpc, Message, Data, Socket, RpcUtils } from "@cmmv/ws";
import { AuthService } from '../services/auth.service';

import { 
    LoginRequest,
    RegisterRequest  
} from "../protos/auth";

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
            path: `./gateways/auth.gateway`,
        });
    }
}
