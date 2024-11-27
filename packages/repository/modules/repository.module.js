"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryModule = void 0;
const core_1 = require("@cmmv/core");
const repository_transpiler_1 = require("../transpilers/repository.transpiler");
exports.RepositoryModule = new core_1.Module('repository', {
    transpilers: [repository_transpiler_1.RepositoryTranspile],
});
