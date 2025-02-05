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

import { II18nCoins } from '../../models/i18n/i18ncoins.model';
import { UserEntity } from '../../entities/auth/user.entity';

@Entity('i18n_coins')
@Index('idx_i18ncoins_code', ['code'], { unique: true })
export class I18nCoinsEntity implements II18nCoins {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ type: 'varchar' })
    code: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    format: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @ManyToOne(() => UserEntity, { nullable: false })
    @ObjectIdColumn({ nullable: false })
    userCreator: ObjectId;

    @ManyToOne(() => UserEntity, { nullable: true })
    @ObjectIdColumn({ nullable: true })
    userLastUpdate: ObjectId;

    @BeforeInsert()
    checkUserCreator() {
        if (!this.userCreator) throw new Error('userCreator is required');
    }
}
