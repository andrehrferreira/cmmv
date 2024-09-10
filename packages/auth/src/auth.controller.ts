import * as passport from 'passport';
import { Controller, Get, Res } from '@cmmv/http';

@Controller('auth')
export class AuthController {
    @Get('google', passport.authenticate('google', { scope: ['profile'] }))
    googleHandler() {}

    @Get(
        'google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
    )
    googleCallbackHandler(@Res() res) {
        res.redirect('/');
    }
}
