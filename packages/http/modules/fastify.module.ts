import { Module } from '@cmmv/core';
import { FastifyTranspiler } from '../transpilers/fastify.transpiler';

export let FastifyModule = new Module('fastify', {
    transpilers: [FastifyTranspiler],
});
