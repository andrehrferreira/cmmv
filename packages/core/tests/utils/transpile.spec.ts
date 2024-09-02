import { strict as assert } from 'assert';
import { Transpile, ITranspile } from '../../utils/transpile.util';

class MockTranspiler1 implements ITranspile {
    public run(): Promise<string> {
        return Promise.resolve('Transpiler1 executed');
    }
}

class MockTranspiler2 implements ITranspile {
    public run(): Promise<string> {
        return Promise.resolve('Transpiler2 executed');
    }
}

class FailingTranspiler implements ITranspile {
    public run(): Promise<void> {
        return Promise.reject(new Error('Transpiler failed'));
    }
}

describe('Transpile', function() {
    let transpileInstance: Transpile;

    beforeEach(function() {
        transpileInstance = new Transpile();
    });

    it('should add a transpiler to the list', function() {
        transpileInstance.add(MockTranspiler1);

        assert.strictEqual((transpileInstance as any).transpilers.length, 1);
        assert.strictEqual((transpileInstance as any).transpilers[0], MockTranspiler1);
    });

    it('should execute all transpilers successfully', async function() {
        transpileInstance.add(MockTranspiler1);
        transpileInstance.add(MockTranspiler2);

        const results = await transpileInstance.transpile();

        assert.strictEqual(results.length, 2);
        assert.strictEqual(results[0], 'Transpiler1 executed');
        assert.strictEqual(results[1], 'Transpiler2 executed');
    });

    it('should throw an error if a transpiler fails', async function() {
        transpileInstance.add(MockTranspiler1);
        transpileInstance.add(FailingTranspiler);

        try {
            await transpileInstance.transpile();
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.message, 'Transpiler failed');
        }
    });
});
