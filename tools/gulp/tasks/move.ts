/**
 * @see https://github.com/nestjs/nest/blob/master/tools/gulp/tasks/move.ts
 */

import { dest, src, task } from 'gulp';
 
const distFiles = src([
  'packages/**/*',
  '!packages/**/*.ts',
  'packages/**/*.d.ts',
]);

function move() {
    return distFiles.pipe(dest('node_modules/@cmmv'));
}

task('move', move);