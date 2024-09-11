import { Module } from '@cmmv/core';

import { RepositoryTranspile } from '../transpilers/repository.transpiler';

export let RepositoryModule = new Module('repository', {
    transpilers: [RepositoryTranspile],
});
