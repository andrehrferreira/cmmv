import { describe, it, expect, beforeEach } from 'vitest';
import { Singleton } from '../../abstracts/singleton.abstract.js';

describe('Singleton', () => {
    let MySingleton;

    beforeEach(() => {
        MySingleton = class extends Singleton {};
    });

    it('should return the same instance when getInstance is called twice', () => {
        const instance1 = MySingleton.getInstance();
        const instance2 = MySingleton.getInstance();

        expect(instance1).toBe(instance2);
        expect(instance1).toBeInstanceOf(MySingleton);
    });

    it('should create a new instance after clearInstance is called', () => {
        const instance1 = MySingleton.getInstance();
        MySingleton.clearInstance();
        const instance2 = MySingleton.getInstance();

        expect(instance1).not.toBe(instance2);
        expect(instance2).toBeInstanceOf(MySingleton);
    });

    it('should maintain instance per subclass', () => {
        const AnotherSingleton = class extends Singleton {};

        const instance1 = MySingleton.getInstance();
        const instance2 = AnotherSingleton.getInstance();

        expect(instance1).not.toBe(instance2);
        expect(instance1).toBeInstanceOf(Singleton);
        expect(instance2).toBeInstanceOf(AnotherSingleton);
    });

    it('should throw an error if instantiation fails', () => {
        const ErrorSingleton = class extends Singleton {
            constructor() {
                super();
                throw new Error('Failed to initialize');
            }
        };

        expect(() => {
            ErrorSingleton.getInstance();
        }).toThrow(
            'Failed to create an instance of ErrorSingleton: Error: Failed to initialize',
        );
    });

    it('should handle multiple instances of different classes independently', () => {
        const AnotherSingleton = class extends Singleton {};

        const instance1 = MySingleton.getInstance();
        const instance2 = AnotherSingleton.getInstance();
        const instance3 = MySingleton.getInstance();
        const instance4 = AnotherSingleton.getInstance();

        expect(instance1).toBe(instance3);
        expect(instance2).toBe(instance4);
        expect(instance1).not.toBe(instance2);
    });

    it('should properly clear instance and create a new one', () => {
        const instance1 = MySingleton.getInstance();
        MySingleton.clearInstance();
        const instance2 = MySingleton.getInstance();

        expect(instance1).not.toBe(instance2);
        expect(instance2).toBeInstanceOf(MySingleton);
    });

    it('should not fail when clearing a non-existent instance', () => {
        const AnotherSingleton = class extends Singleton {};
        AnotherSingleton.clearInstance(); // No instance exists, but shouldn"t throw
        const instance = AnotherSingleton.getInstance();
        expect(instance).toBeInstanceOf(AnotherSingleton);
    });
});
