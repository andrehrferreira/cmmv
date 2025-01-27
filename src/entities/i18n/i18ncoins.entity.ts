/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { Entity, ObjectIdColumn, Column, Index, ObjectId } from 'typeorm';

import { II18nCoins } from '../../models/i18n/i18ncoins.model';

@Entity('i18ncoins')
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
}
