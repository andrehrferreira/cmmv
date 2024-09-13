import { Module } from '@cmmv/core';

import { RepositoryTranspile } from '../transpilers/repository.transpiler';

export const RepositoryModule = new Module('repository', {
    transpilers: [RepositoryTranspile],
});
