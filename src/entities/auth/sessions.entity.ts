/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import {
    Entity,
    ObjectIdColumn,
    Column,
    Index,
    ObjectId,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';

import { ISessions } from '@models/auth/sessions.model';

import { UserEntity } from '@entities/auth/user.entity';

@Entity('auth_sessions')
@Index('idx_sessions_uuid', ['uuid'], { unique: true })
@Index('idx_sessions_fingerprint', ['fingerprint'])
export class SessionsEntity implements ISessions {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    uuid: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    fingerprint: string;

    @Column({
        type: 'string',
        nullable: true,
    })
    user: UserEntity | string | ObjectId | null;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    ipAddress: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    device?: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    browser?: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    os?: string;

    @Column({
        type: 'boolean',
        default: false,
        nullable: false,
    })
    revoked: boolean;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}
