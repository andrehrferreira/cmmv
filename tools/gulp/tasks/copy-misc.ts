/**
 * @see https://github.com/nestjs/nest/blob/master/tools/gulp/tasks/copy-misc.ts
 */

import { task, src, dest } from 'gulp';
import { packagePaths } from '../config';

function copyMisc(): NodeJS.ReadWriteStream {
  const miscFiles = src(['Readme.md', 'LICENSE', '.npmignore']);

  return packagePaths.reduce(
    (stream, packagePath) => stream.pipe(dest(packagePath)),
    miscFiles,
  );
}

task('copy-misc', copyMisc);