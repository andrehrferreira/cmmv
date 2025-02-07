/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { Rpc, Message, Data, Socket, RpcUtils } from '@cmmv/ws';

import {
    AddGroupsRequest,
    UpdateGroupsRequest,
    DeleteGroupsRequest,
} from '../../protos/auth/groups.d';

import { Groups } from '../../models/auth/groups.model';

import { GroupsService } from '../../services/auth/groups.service';

@Rpc('groups')
export class GroupsGateway {
    constructor(private readonly groupsservice: GroupsService) {}

    @Message('GetAllGroupsRequest')
    async getAll(@Socket() socket) {
        try {
            const items = await this.groupsservice.getAll();

            const response = await RpcUtils.pack(
                'groups',
                'GetAllGroupsResponse',
                items.data,
            );

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('AddGroupsRequest')
    async insert(@Data() data: AddGroupsRequest, @Socket() socket) {
        try {
            const groups = Groups.fromPartial(data.item);
            const result = await this.groupsservice.insert(groups);
            const response = await RpcUtils.pack(
                'groups',
                'AddGroupsResponse',
                { item: result, id: result._id },
            );

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('UpdateGroupsRequest')
    async update(@Data() data: UpdateGroupsRequest, @Socket() socket) {
        try {
            const result = await this.groupsservice.update(data.id, data.item);
            const response = await RpcUtils.pack(
                'groups',
                'UpdateGroupsResponse',
                {
                    success: result.success,
                    affected: result.affected,
                },
            );

            if (response) socket.send(response);
        } catch (e) {}
    }

    @Message('DeleteGroupsRequest')
    async delete(@Data() data: DeleteGroupsRequest, @Socket() socket) {
        try {
            const result = await this.groupsservice.delete(data.id);
            const response = await RpcUtils.pack(
                'groups',
                'DeleteGroupsResponse',
                {
                    success: result.success,
                    affected: result.affected,
                },
            );

            if (response) socket.send(response);
        } catch (e) {}
    }
}
