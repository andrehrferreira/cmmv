import { describe, it, expect, beforeEach } from 'vitest';

import { Application, Module } from '@cmmv/core';

import { Test } from './testing.service';

describe('Testing create mock application', () => {
    it('should create application', () => {
        const app = Test.createApplication();
        expect(app).instanceOf(Application);
    });

    it('should load module', () => {
        const mockModule = Test.createMockModule();
        const app = Test.createApplication({
            modules: [mockModule],
        });

        expect(app).instanceOf(Application);
        const module = Module.getModule('mock-module');
        expect(module).instanceOf(Module);
    });
});
