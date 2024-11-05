// Generated automatically by CMMV

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    ObjectIdColumn,
    ObjectID,
} from 'typeorm';

import { User } from '../models/user.model';

@Entity('user')
@Index('idx_user_username', ['username'], { unique: true })
@Index('idx_user_googleId', ['googleId'])
export class UserEntity implements User {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column({ type: 'varchar' })
    username: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar', nullable: true })
    googleId: string;

    @Column({ type: 'varchar', default: '[]' })
    groups: string;
}
