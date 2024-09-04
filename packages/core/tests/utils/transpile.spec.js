"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const transpile_util_1 = require("../../utils/transpile.util");
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
describe('Transpile', function () {
    let transpileInstance;
    beforeEach(function () {
        transpileInstance = new transpile_util_1.Transpile();
    });
    it('should add a transpiler to the list', function () {
        transpileInstance.add(MockTranspiler1);
        assert_1.strict.strictEqual(transpileInstance.transpilers.length, 1);
        assert_1.strict.strictEqual(transpileInstance.transpilers[0], MockTranspiler1);
    });
    it('should execute all transpilers successfully', async function () {
        transpileInstance.add(MockTranspiler1);
        transpileInstance.add(MockTranspiler2);
        const results = await transpileInstance.transpile();
        assert_1.strict.strictEqual(results.length, 2);
        assert_1.strict.strictEqual(results[0], 'Transpiler1 executed');
        assert_1.strict.strictEqual(results[1], 'Transpiler2 executed');
    });
    it('should throw an error if a transpiler fails', async function () {
        transpileInstance.add(MockTranspiler1);
        transpileInstance.add(FailingTranspiler);
        try {
            await transpileInstance.transpile();
            assert_1.strict.fail('Expected an error to be thrown');
        }
        catch (error) {
            assert_1.strict.strictEqual(error.message, 'Transpiler failed');
        }
    });
});
