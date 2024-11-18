"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastifyModule = void 0;
const core_1 = require("@cmmv/core");
const fastify_transpiler_1 = require("../transpilers/fastify.transpiler");
exports.FastifyModule = new core_1.Module('fastify', {
    transpilers: [fastify_transpiler_1.FastifyTranspiler],
});
