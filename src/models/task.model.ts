// Generated automatically by CMMV

import * as fastJson from 'fast-json-stringify';
import { ObjectId } from 'mongodb';
import { Expose, instanceToPlain, Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import * as crypto from 'crypto';

export interface ITask {
    _id?: ObjectId;
    label: string;
    checked: boolean;
    removed: boolean;
    createAt: string;
}

export class Task implements ITask {
    @Expose()
    _id?: ObjectId;

    @Expose()
    @IsString({ message: 'Invalid label' })
    @IsNotEmpty({ message: 'Invalid label' })
    label: string;

    @Expose()
    @IsBoolean({ message: 'Invalid checked type' })
    checked: boolean = false;

    @Expose()
    @IsBoolean({ message: 'Invalid removed type' })
    removed: boolean = false;

    @Expose()
    @Type(() => Date)
    createAt: string;

    constructor(partial: Partial<Task>) {
        Object.assign(this, partial);
    }

    public serialize() {
        return instanceToPlain(this);
    }

    public toString() {
        return TaskFastSchema(this);
    }
}

// Schema for fast-json-stringify
export const TaskFastSchema = fastJson({
    title: 'Task Schema',
    type: 'object',
    properties: {
        label: { type: 'string' },
        checked: { type: 'boolean', default: false },
        removed: { type: 'boolean', default: false },
        createAt: { type: 'string' },
    },
    required: [],
});
