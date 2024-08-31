import { Module } from "@cmmv/core";

import { RepositoryTranspile } from "./repository.transpiler";

export let RepositoryModule = new Module({
    transpilers: [RepositoryTranspile]
})