"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryModule = void 0;
const core_1 = require("@cmmv/core");
const repository_config_1 = require("./repository.config");
const repository_transpiler_1 = require("./repository.transpiler");
exports.RepositoryModule = new core_1.Module('repository', {
    configs: [repository_config_1.RepositoryConfig],
    transpilers: [repository_transpiler_1.RepositoryTranspile],
});
