import { Controller } from '@cmmv/http';

import { UserControllerGenerated } from './user.controller.generated';

import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from '../../models/auth/user.model';

@Controller('user')
export class UserController extends UserControllerGenerated {
    //Function UserController not implemented
}
