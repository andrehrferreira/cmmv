import { Module } from '@cmmv/core';

import { RepositoryConfig } from './repository.config';
import { RepositoryTranspile } from './repository.transpiler';

export const RepositoryModule = new Module('repository', {
    configs: [RepositoryConfig],
    transpilers: [RepositoryTranspile],
});
