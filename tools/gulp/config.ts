/**
 * @see https://github.com/nestjs/nest/blob/master/tools/gulp/config.ts
 */

import { getDirs } from './util/task-helpers';

export const source = 'packages';

export const packagePaths = getDirs(source);