// Generated automatically by CMMV
        
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('task')
@Index("idx_task_label", ["label"], { unique: true })
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    label: string;
    @Column({ type: 'boolean', default: false })
    checked: boolean;
    @Column({ type: 'boolean', default: false })
    removed: boolean;
}
