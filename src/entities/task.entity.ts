// Generated automatically by CMMV

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    ObjectIdColumn,
    ObjectID,
} from 'typeorm';

import { Task } from '../models/task.model';

@Entity('task')
@Index('idx_task_label', ['label'], { unique: true })
export class TaskEntity implements Task {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column({ type: 'varchar' })
    label: string;

    @Column({ type: 'boolean', default: false })
    checked: boolean;

    @Column({ type: 'boolean', default: false })
    removed: boolean;

    @Column({ type: 'date' })
    createAt: string;
}
