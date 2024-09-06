// Generated automatically by CMMV

import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { User } from '../models/user.model';

@Entity('user')
@Index('idx_user_username', ['username'], { unique: true })
export class UserEntity implements User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;
    @Column({ type: 'varchar' })
    username: string;
    @Column({ type: 'varchar' })
    password: string;
}
