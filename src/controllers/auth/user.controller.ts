import { Controller } from '@cmmv/http';

import { UserControllerGenerated } from '@generated/controllers/auth/user.controller';

import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from '@models/auth/user.model';

@Controller('user')
export class UserController extends UserControllerGenerated {
    //Function UserController not implemented
}
