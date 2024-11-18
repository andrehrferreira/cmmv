"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const transpile_1 = require("../../lib/transpile");
class MockTranspiler1 {
    run() {
        return Promise.resolve('Transpiler1 executed');
    }
}
class MockTranspiler2 {
    run() {
        return Promise.resolve('Transpiler2 executed');
    }
}
class FailingTranspiler {
    run() {
        return Promise.reject(new Error('Transpiler failed'));
    }
}
(0, vitest_1.describe)('Transpile', () => {
    let transpileInstance;
    (0, vitest_1.beforeEach)(() => {
        transpileInstance = new transpile_1.Transpile();
    });
    (0, vitest_1.it)('should add a transpiler to the list', () => {
        transpileInstance.add(MockTranspiler1);
        (0, vitest_1.expect)(transpileInstance.transpilers.length).toBe(1);
        (0, vitest_1.expect)(transpileInstance.transpilers[0]).toBe(MockTranspiler1);
    });
    (0, vitest_1.it)('should execute all transpilers successfully', async () => {
        transpileInstance.add(MockTranspiler1);
        transpileInstance.add(MockTranspiler2);
        const results = await transpileInstance.transpile();
        (0, vitest_1.expect)(results.length).toBe(2);
        (0, vitest_1.expect)(results[0]).toBe('Transpiler1 executed');
        (0, vitest_1.expect)(results[1]).toBe('Transpiler2 executed');
    });
    (0, vitest_1.it)('should throw an error if a transpiler fails', async () => {
        transpileInstance.add(MockTranspiler1);
        transpileInstance.add(FailingTranspiler);
        try {
            await transpileInstance.transpile();
            vitest_1.expect.fail('Expected an error to be thrown');
        }
        catch (error) {
            (0, vitest_1.expect)(error.message).toBe('Transpiler failed');
        }
    });
});
