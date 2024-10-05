import { strict as assert } from 'assert';
import { Singleton } from '../../abstracts/singleton.abstract.js';

describe('Singleton', function () {
    let MySingleton;

    before(async function () {
        MySingleton = class extends Singleton {};
    });

    it('should return the same instance when getInstance is called twice', function () {
        const instance1 = MySingleton.getInstance();
        const instance2 = MySingleton.getInstance();

        assert.strictEqual(instance1, instance2);
        assert(instance1 instanceof MySingleton);
    });

    it('should create a new instance after clearInstance is called', function () {
        const instance1 = MySingleton.getInstance();
        MySingleton.clearInstance();
        const instance2 = MySingleton.getInstance();

        assert.notStrictEqual(instance1, instance2);
        assert(instance2 instanceof MySingleton);
    });

    it('should maintain instance per subclass', function () {
        const AnotherSingleton = class extends Singleton {};

        const instance1 = MySingleton.getInstance();
        const instance2 = AnotherSingleton.getInstance();

        assert.notStrictEqual(instance1, instance2);
        assert(instance1 instanceof MySingleton);
        assert(instance2 instanceof AnotherSingleton);
    });

    it('should throw an error if instantiation fails', function () {
        const ErrorSingleton = class extends Singleton {
            constructor() {
                super();
                throw new Error('Failed to initialize');
            }
        };

        assert.throws(() => {
            ErrorSingleton.getInstance();
        }, /Failed to create an instance of ErrorSingleton: Error: Failed to initialize/);
    });

    it('should handle multiple instances of different classes independently', function () {
        const AnotherSingleton = class extends Singleton {};

        const instance1 = MySingleton.getInstance();
        const instance2 = AnotherSingleton.getInstance();
        const instance3 = MySingleton.getInstance();
        const instance4 = AnotherSingleton.getInstance();

        assert.strictEqual(instance1, instance3);
        assert.strictEqual(instance2, instance4);
        assert.notStrictEqual(instance1, instance2);
    });

    it('should properly clear instance and create a new one', function () {
        const instance1 = MySingleton.getInstance();
        MySingleton.clearInstance();
        const instance2 = MySingleton.getInstance();

        assert.notStrictEqual(instance1, instance2);
        assert(instance2 instanceof MySingleton);
    });

    it('should not fail when clearing a non-existent instance', function () {
        const AnotherSingleton = class extends Singleton {};
        AnotherSingleton.clearInstance(); // No instance exists, but shouldn't throw
        const instance = AnotherSingleton.getInstance();
        assert(instance instanceof AnotherSingleton);
    });
});
