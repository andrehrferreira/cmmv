import { Module } from '@cmmv/core';
import { FastifyTranspiler } from '../transpilers/fastify.transpiler';

export const FastifyModule = new Module('fastify', {
    transpilers: [FastifyTranspiler],
});
