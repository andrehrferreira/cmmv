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
    BeforeInsert,
} from 'typeorm';

import { IGroups } from '@models/auth/groups.model';

import { UserEntity } from '@entities/auth/user.entity';
import { RolesEntity } from '@entities/auth/roles.entity';

@Entity('auth_groups')
@Index('idx_groups_name', ['name'], { unique: true })
export class GroupsEntity implements IGroups {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    name: string;

    @Column({
        type: 'simple-array',
        nullable: true,
    })
    roles?: RolesEntity[] | string[] | ObjectId[] | null;

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

    @ManyToOne(() => UserEntity, { nullable: true })
    @ObjectIdColumn({ nullable: true })
    userCreator: ObjectId;

    @ManyToOne(() => UserEntity, { nullable: true })
    @ObjectIdColumn({ nullable: true })
    userLastUpdate: ObjectId;
}
