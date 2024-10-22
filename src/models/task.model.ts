// Generated automatically by CMMV

import * as fastJson from 'fast-json-stringify';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import * as crypto from 'crypto';

export interface ITask {
    id?: any;
    label: string;
    checked: boolean;
    removed: boolean;
}

export class Task implements ITask {
    id?: any;

    @IsString({ message: 'Invalid label' })
    @IsNotEmpty({ message: 'Invalid label' })
    label: string;

    @IsBoolean({ message: 'Invalid checked type' })
    checked: boolean = false;

    @IsBoolean({ message: 'Invalid removed type' })
    removed: boolean = false;

    constructor(partial: Partial<Task>) {
        Object.assign(this, partial);
    }
}

// Schema for fast-json-stringify
export const TaskSchema = fastJson({
    title: 'Task Schema',
    type: 'object',
    properties: {
        label: { type: 'string' },
        checked: { type: 'boolean', default: false },
        removed: { type: 'boolean', default: false },
    },
    required: [],
});
