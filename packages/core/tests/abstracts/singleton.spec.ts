import { strict as assert } from 'assert';
import { Singleton } from '../../abstracts/singleton.abstract.js';

describe('Singleton', function() {
    let MySingleton;

    before(async function() {
        MySingleton = class extends Singleton {};
    });

    it('should return the same instance when getInstance is called twice', function() {
        const instance1 = MySingleton.getInstance();
        const instance2 = MySingleton.getInstance();
        
        assert.strictEqual(instance1, instance2);
        assert(instance1 instanceof MySingleton);
    });

    it('should create a new instance after clearInstance is called', function() {
        const instance1 = MySingleton.getInstance();
        MySingleton.clearInstance();
        const instance2 = MySingleton.getInstance();
        
        assert.notStrictEqual(instance1, instance2);
        assert(instance2 instanceof MySingleton);
    });
});
