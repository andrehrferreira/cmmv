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

import { II18nCountries } from '../../models/i18n/i18ncountries.model';
import { UserEntity } from '../../entities/auth/user.entity';
import { I18nCoinsEntity } from './i18ncoins.entity';

@Entity('i18n_countries')
@Index('idx_i18ncountries_code', ['code'], { unique: true })
export class I18nCountriesEntity implements II18nCountries {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ type: 'varchar' })
    code: string;

    @Column({ type: 'varchar' })
    name: string;

    @ManyToOne(() => I18nCoinsEntity, coins => coins._id, { nullable: false })
    currency?: I18nCoinsEntity;

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
