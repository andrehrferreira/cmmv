import { Controller, Post, Body, Get, Header } from '@cmmv/http';

import { AuthOptService } from '../services/opt.service';

@Controller('auth')
export class AuthOPTController {
    constructor(private readonly optService: AuthOptService) {}

    @Get('opt-qrcode')
    async handlerGenerateOptSecret(@Header('authorization') token) {
        return this.optService.generateOptSecret(token);
    }

    @Post('opt-enable')
    async handlerEnable2FA(@Header('authorization') token, @Body() payload) {
        return this.optService.updateOptSecret(token, payload?.secret);
    }

    @Post('opt-validate')
    async handlerValidateOptSecret(
        @Header('authorization') token,
        @Body() payload,
    ) {
        return this.optService.validateOptSecret(token, payload?.secret);
    }
}
