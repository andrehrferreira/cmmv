// Generated automatically by CMMV

import { Controller, Get, Request } from '@cmmv/http';

@Controller()
export class IndexController {
    @Get()
    async getAll(@Request() req, @Request() res) {
        res.render('index');
    }
}
