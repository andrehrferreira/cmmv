/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

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
    Header,
} from '@cmmv/http';

import { AuthService } from '../../services/auth/auth.service';

import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from '../../models/auth/user.model';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('user')
    @Auth()
    async user(@User() user) {
        return user;
    }

    @Post('login')
    async handlerLogin(
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
    async handlerRegister(
        @Body() payload: RegisterRequest,
    ): Promise<RegisterResponse> {
        return await this.authService.register(payload);
    }

    @Post('check-username')
    async handlerCheckUsername(
        @Body() payload: { username: string },
        @Response() res,
    ) {
        const exists = await this.authService.checkUsernameExists(
            payload.username,
        );
        res.type('text/json').send(exists.toString());
    }

    //OPT
    @Get('opt-secret')
    async handlerGenerateOptSecret(@Header('authorization') token) {
        return await this.authService.generateOptSecret(token);
    }
}
