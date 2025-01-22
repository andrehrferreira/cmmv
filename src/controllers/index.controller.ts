import { Controller, Request, Response, Get, Param } from '@cmmv/http';

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
}
