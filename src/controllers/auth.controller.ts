// Generated automatically by CMMV

import { Config } from '@cmmv/core';
import { Auth } from '@cmmv/auth';

import {
    Controller,
    Post,
    Body,
    Request,
    Response,
    Get,
    User,
    Session,
} from '@cmmv/http';

import { AuthService } from '../services/auth.service';

import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from '../protos/auth';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('user')
    @Auth()
    async user(@User() user) {
        return user;
    }

    @Post('login')
    async login(
        @Body() payload: LoginRequest,
        @Request() req,
        @Response() res,
        @Session() session,
    ): Promise<LoginResponse> {
        const { result } = await this.authService.login(
            payload,
            req,
            res,
            session,
        );
        return result;
    }

    @Post('register')
    async register(
        @Body() payload: RegisterRequest,
    ): Promise<RegisterResponse> {
        return await this.authService.register(payload);
    }
}
