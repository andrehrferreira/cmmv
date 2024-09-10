// Generated automatically by CMMV

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Telemetry } from '@cmmv/core';
import { Controller, Post, Body } from '@cmmv/http';
import { AuthService } from '../services/auth.service';
import { LoginRequest, LoginResponse } from '../protos/auth';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() payload: LoginRequest): Promise<LoginResponse> {
        const result = await this.authService.login(payload);
        return result;
    }
}
