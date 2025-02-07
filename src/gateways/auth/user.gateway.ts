/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { Rpc, Message, Data, Socket, RpcUtils } from '@cmmv/ws';

import {
    AddUserRequest,
    UpdateUserRequest,
    DeleteUserRequest,
} from '../../protos/auth/user.d';

import { User } from '../../models/auth/user.model';

import { UserService } from '../../services/auth/user.service';

@Rpc('user')
export class UserGateway {
    constructor(private readonly userservice: UserService) {}

    @Message('GetAllUserRequest')
    async getAll(@Socket() socket) {
        try {
            const items = await this.userservice.getAll();

            const response = await RpcUtils.pack(
                'user',
                'GetAllUserResponse',
                items.data,
            );

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('AddUserRequest')
    async insert(@Data() data: AddUserRequest, @Socket() socket) {
        try {
            const user = User.fromPartial(data.item);
            const result = await this.userservice.insert(user);
            const response = await RpcUtils.pack('user', 'AddUserResponse', {
                item: result,
                id: result._id,
            });

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('UpdateUserRequest')
    async update(@Data() data: UpdateUserRequest, @Socket() socket) {
        try {
            const result = await this.userservice.update(data.id, data.item);
            const response = await RpcUtils.pack('user', 'UpdateUserResponse', {
                success: result.success,
                affected: result.affected,
            });

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('DeleteUserRequest')
    async delete(@Data() data: DeleteUserRequest, @Socket() socket) {
        try {
            const result = await this.userservice.delete(data.id);
            const response = await RpcUtils.pack('user', 'DeleteUserResponse', {
                success: result.success,
                affected: result.affected,
            });

            if (response) socket.send(response);
        } catch (e) {}
    }
}
