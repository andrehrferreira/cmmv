/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { Rpc, Message, Data, Socket, RpcUtils } from '@cmmv/ws';

import {
    AddRolesRequest,
    UpdateRolesRequest,
    DeleteRolesRequest,
} from '../../protos/auth/roles.d';

import { Roles } from '../../models/auth/roles.model';

import { RolesService } from '../../services/auth/roles.service';

@Rpc('roles')
export class RolesGateway {
    constructor(private readonly rolesservice: RolesService) {}

    @Message('GetAllRolesRequest')
    async getAll(@Socket() socket) {
        try {
            const items = await this.rolesservice.getAll();

            const response = await RpcUtils.pack(
                'roles',
                'GetAllRolesResponse',
                items.data,
            );

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('AddRolesRequest')
    async insert(@Data() data: AddRolesRequest, @Socket() socket) {
        try {
            const roles = Roles.fromPartial(data.item);
            const result = await this.rolesservice.insert(roles);
            const response = await RpcUtils.pack('roles', 'AddRolesResponse', {
                item: result,
                id: result._id,
            });

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('UpdateRolesRequest')
    async update(@Data() data: UpdateRolesRequest, @Socket() socket) {
        try {
            const result = await this.rolesservice.update(data.id, data.item);
            const response = await RpcUtils.pack(
                'roles',
                'UpdateRolesResponse',
                {
                    success: result.success,
                    affected: result.affected,
                },
            );

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('DeleteRolesRequest')
    async delete(@Data() data: DeleteRolesRequest, @Socket() socket) {
        try {
            const result = await this.rolesservice.delete(data.id);
            const response = await RpcUtils.pack(
                'roles',
                'DeleteRolesResponse',
                {
                    success: result.success,
                    affected: result.affected,
                },
            );

            if (response) socket.send(response);
        } catch (e) {}
    }
}
