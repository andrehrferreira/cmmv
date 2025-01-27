/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { Rpc, Message, Data, Socket, RpcUtils } from '@cmmv/ws';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '../entities/user.entity';

import {
    AddUserRequest,
    UpdateUserRequest,
    DeleteUserRequest,
} from '../protos/auth';

import { UserService } from '../services/user.service';

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
                items,
            );

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('AddUserRequest')
    async add(@Data() data: AddUserRequest, @Socket() socket) {
        try {
            const entity = plainToClass(UserEntity, data.item);
            const result = await this.userservice.add(entity);
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
            const entity = plainToClass(UserEntity, data.item);
            const result = await this.userservice.update(data.id, entity);
            const response = await RpcUtils.pack('user', 'UpdateUserResponse', {
                item: result,
                id: result._id,
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
                id: data.id,
            });

            if (response) socket.send(response);
        } catch (e) {}
    }
}
