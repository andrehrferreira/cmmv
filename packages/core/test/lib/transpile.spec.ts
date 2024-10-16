import { describe, it, expect, beforeEach } from 'vitest';
import { Transpile, ITranspile } from '../../lib/transpile';

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

describe('Transpile', () => {
    let transpileInstance: Transpile;

    beforeEach(() => {
        transpileInstance = new Transpile();
    });

    it('should add a transpiler to the list', () => {
        transpileInstance.add(MockTranspiler1);

        expect((transpileInstance as any).transpilers.length).toBe(1);
        expect((transpileInstance as any).transpilers[0]).toBe(MockTranspiler1);
    });

    it('should execute all transpilers successfully', async () => {
        transpileInstance.add(MockTranspiler1);
        transpileInstance.add(MockTranspiler2);

        const results = await transpileInstance.transpile();

        expect(results.length).toBe(2);
        expect(results[0]).toBe('Transpiler1 executed');
        expect(results[1]).toBe('Transpiler2 executed');
    });

    it('should throw an error if a transpiler fails', async () => {
        transpileInstance.add(MockTranspiler1);
        transpileInstance.add(FailingTranspiler);

        try {
            await transpileInstance.transpile();
            expect.fail('Expected an error to be thrown');
        } catch (error: any) {
            expect(error.message).toBe('Transpiler failed');
        }
    });
});
