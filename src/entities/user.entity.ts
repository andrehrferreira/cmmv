// Generated automatically by CMMV

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    ObjectIdColumn,
    ObjectId,
} from 'typeorm';

import { IUser } from '../models/user.model';

@Entity('user')
@Index('idx_user_username', ['username'], { unique: true })
@Index('idx_user_googleId', ['googleId'])
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

    @Column({ type: 'boolean', default: false })
    root: boolean;
}
