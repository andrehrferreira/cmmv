// Generated automatically by CMMV

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
}
