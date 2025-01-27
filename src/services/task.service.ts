import { Service } from '@cmmv/core';

import { TaskServiceGenerated } from './task.service.generated';

import {} from '../models/task.model';

@Service('task')
export class TaskService extends TaskServiceGenerated {}
