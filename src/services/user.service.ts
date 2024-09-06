// Generated automatically by CMMV

import { classToPlain, plainToClass } from 'class-transformer';
import { Telemetry } from '@cmmv/core';
import { AbstractService, Service } from '@cmmv/http';
import { Repository } from '@cmmv/repository';
import { UserEntity } from '../entities/user.entity';

@Service('user')
export class UserService extends AbstractService {
    public override name = 'user';

    async getAll(queries?: any, req?: any): Promise<UserEntity[]> {
        try {
            Telemetry.start('UserService::GetAll', req?.requestId);
            let result = await Repository.findAll(UserEntity);
            Telemetry.end('UserService::GetAll', req?.requestId);
            return result;
        } catch (e) {}
    }

    async getById(id: string, req?: any): Promise<UserEntity> {
        try {
            Telemetry.start('UserService::GetById', req?.requestId);
            const item = await Repository.findBy(UserEntity, { id });
            Telemetry.end('UserService::GetById', req?.requestId);

            if (!item) throw new Error('Item not found');

            return item;
        } catch (e) {}
    }

    async add(item: Partial<UserEntity>, req?: any): Promise<UserEntity> {
        try {
            Telemetry.start('UserService::Add', req?.requestId);
            const result = await Repository.insert<UserEntity>(
                UserEntity,
                item,
            );
            Telemetry.end('UserService::Add', req?.requestId);
            return result;
        } catch (e) {}
    }

    async update(
        id: string,
        item: Partial<UserEntity>,
        req?: any,
    ): Promise<UserEntity> {
        try {
            Telemetry.start('UserService::Update', req?.requestId);
            const result = await Repository.update(UserEntity, id, item);
            Telemetry.end('UserService::Update', req?.requestId);
            return result;
        } catch (e) {}
    }

    async delete(
        id: string,
        req?: any,
    ): Promise<{ success: boolean; affected: number }> {
        try {
            Telemetry.start('UserService::Delete', req?.requestId);
            const result = await Repository.delete(UserEntity, id);
            Telemetry.end('UserService::Delete', req?.requestId);
            return { success: result.affected > 0, affected: result.affected };
        } catch (e) {}
    }
}
