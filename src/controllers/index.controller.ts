import {
    Controller,
    Request,
    Response,
    Get,
    Redirect,
    HttpCode,
} from '@cmmv/http';

import { ServiceRegistry } from '@cmmv/core';

@Controller()
export class IndexController {
    @Get()
    async renderIndex(@Request() req, @Response() res) {
        res.render('index', {
            nonce: res.locals.nonce,
            services: ServiceRegistry.getServicesArr(),
            requestId: req.requestId,
        });
    }

    @Get('secure')
    @Redirect('/login', 302)
    async redirectToLogin() {}

    @Get('code')
    @HttpCode(403)
    async routerCode() {
        return 'Return 403 code';
    }
}
