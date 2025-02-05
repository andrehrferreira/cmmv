/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { Entity, ObjectIdColumn, Column, Index, ObjectId } from 'typeorm';

import { IUser } from '../models/user.model';

@Entity('user')
@Index('idx_user_username', ['username'], { unique: true })
@Index('idx_user_googleId', ['googleId'])
@Index('idx_user_login', ['username', 'password'])
export class UserEntity implements IUser {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ type: 'varchar' })
    username: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar', nullable: true })
    googleId: string;

    @Column({ type: 'varchar', default: '[]' })
    groups: string;

    @Column({ type: 'varchar', default: '[]' })
    roles: string;

    @Column({ type: 'boolean', default: false })
    root: boolean;
}
