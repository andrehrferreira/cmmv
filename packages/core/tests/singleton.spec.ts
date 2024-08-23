import { expect } from 'chai';
import { Singleton } from '../abstracts/singleton-abstract'; 

class MySingleton extends Singleton {
    public value: number = 42;
}

describe('Singleton Pattern Test', () => {

    it('should return the same instance every time', () => {
        const instance1 = MySingleton.getInstance();
        const instance2 = MySingleton.getInstance();

        expect(instance1).to.equal(instance2);
    });

    it('should allow setting and getting instance properties', () => {
        const instance = MySingleton.getInstance();
        instance.value = 100;

        const instance2 = MySingleton.getInstance();
        expect(instance2.value).to.equal(100);
    });

    it('should clear the instance', () => {
        const instance1 = MySingleton.getInstance();
        MySingleton.clearInstance();

        const instance2 = MySingleton.getInstance();
        expect(instance1).to.not.equal(instance2);
    });

    it('should throw error if instance creation fails', () => {
        class FailingSingleton extends Singleton {
            constructor() {
                super();
                throw new Error('Forced failure');
            }
        }

        expect(() => FailingSingleton.getInstance()).to.throw('Failed to create an instance of FailingSingleton');
    });
});
