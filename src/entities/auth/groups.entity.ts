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
    ManyToOne,
} from 'typeorm';

import { IGroups } from '../../models/auth/groups.model';
import { RolesEntity } from './roles.entity';

@Entity('groups')
@Index('idx_groups_name', ['name'], { unique: true })
export class GroupsEntity implements IGroups {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ type: 'varchar' })
    name: string;

    @ObjectIdColumn({ nullable: true })
    roles?: RolesEntity[] | string[] | ObjectId;
}
