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

import { IUser } from '@models/auth/user.model';

import { GroupsEntity } from '@entities/auth/groups.entity';
import { RolesEntity } from '@entities/auth/roles.entity';

@Entity('auth_users')
@Index('idx_user_username', ['username'], { unique: true })
@Index('idx_user_provider', ['provider'])
@Index('idx_user_login', ['username', 'password'])
export class UserEntity implements IUser {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ type: 'varchar' })
    username: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar', nullable: true })
    provider?: string;

    @Column({ type: 'simple-array', nullable: true })
    groups?: GroupsEntity[] | string[] | ObjectId[] | null;

    @Column({ type: 'simple-array', nullable: true })
    roles?: RolesEntity[] | string[] | ObjectId[] | null;

    @Column({ type: 'boolean', default: false })
    root: boolean;

    @Column({ type: 'boolean', default: false })
    blocked: boolean;

    @Column({ type: 'boolean', default: false })
    validated: boolean;

    @Column({ type: 'boolean', default: false })
    verifyEmail: boolean;

    @Column({ type: 'int', nullable: true })
    verifyEmailCode?: number;

    @Column({ type: 'boolean', default: false })
    verifySMS: boolean;

    @Column({ type: 'int', nullable: true })
    verifySMSCode?: number;

    @Column({ type: 'varchar', nullable: true })
    optSecret?: string;

    @Column({ type: 'boolean', default: false })
    optSecretVerify: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}
