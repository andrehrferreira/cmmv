import { Controller, Get, Req, Res } from '@cmmv/http';

@Controller('node_modules')
export class ViteController {
    @Get('*')
    async getNodeModules(@Req() req, @Res() res) {}

    @Get('@*')
    async getAlias(@Req() req, @Res() res) {}
}

@Controller()
export class ViteAliasController {
    @Get('*')
    async getNodeModules(@Req() req, @Res() res) {}

    @Get('@*')
    async getAlias(@Req() req, @Res() res) {}
}
