import * as fs from 'fs';
import * as path from 'path';

import {
    Application,
    Config,
    ITranspile,
    Logger,
    Module,
    Scope,
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
        const outputDir = path.resolve(process.cwd(), './src/controllers');
        const controllerFileName = `auth.controller.ts`;

        const controllerTemplate = `// Generated automatically by CMMV
    
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Telemetry } from "@cmmv/core";
import { Controller, Post, Body } from "@cmmv/http";
import { AuthService } from '../services/auth.service';
import { LoginRequest, LoginResponse } from '../protos/auth';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    async login(@Body() payload: LoginRequest): Promise<LoginResponse> {
        const result = await this.authService.login(payload);
        return result;
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

        const serviceTemplate = `// Generated automatically by CMMV
    
import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { 
    Telemetry, Service, 
    AbstractService, Config
} from "@cmmv/core";

${hasRepository ? "import { Repository } from '@cmmv/repository';" : ''}

import { User, IUser } from '../models/user.model';
import { LoginRequest, LoginResponse } from '../protos/auth';
${hasRepository ? "import { UserEntity } from '../entities/user.entity';" : ''}

@Service("auth")
export class AuthService extends AbstractService {

    public async login(payload: LoginRequest): Promise<LoginResponse> {
        Telemetry.start('AuthService::login');

        const jwtToken = Config.get("auth.jwtSecret");
        const { username, password } = payload;

        ${
            hasRepository
                ? `const user = await Repository.findBy(UserEntity, { username, password });;

        if (!user || user.password !== password) 
            return { success: false, token: "", message: "Invalid credentials" };`
                : `const user = { username, password: "dummyPasswordHash" };
        if (password !== "dummyPasswordHash") 
            return { success: false, token: "", message: "Invalid credentials" };`
        }

        const token = jwt.sign({
            id: user.id
        }, jwtToken, { algorithm: 'RS256' });

        Telemetry.end('AuthService::login');
        return { success: true, token, message: "Login successful" };
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
    LoginRequest  
} from "../protos/auth";

@Rpc("auth")
export class AuthGateway {
    constructor(private readonly authService: AuthService) {}

    @Message("LoginRequest")
    async login(@Data() data: LoginRequest, @Socket() socket) {
        try{
            const result = await this.authService.login(data);
            const response = await RpcUtils.pack("auth", "LoginResponse", result);

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
