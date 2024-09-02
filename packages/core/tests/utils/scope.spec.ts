import { strict as assert } from 'assert';
import { Scope } from '../../utils/scope.utils';

describe('Scope', function() {
    beforeEach(function() {
        // Clear any existing data before each test to ensure isolation
        Scope.clear('testData');
        Scope.clear('testArray');
    });

    it('should set and retrieve data by name', function() {
        const result = Scope.set('testData', { key: 'value' });
        assert.strictEqual(result, true);

        const data = Scope.get<{ key: string }>('testData');
        assert.deepStrictEqual(data, { key: 'value' });
    });

    it('should not overwrite existing data', function() {
        Scope.set('testData', { key: 'value1' });
        const result = Scope.set('testData', { key: 'value2' });

        assert.strictEqual(result, false);
        const data = Scope.get<{ key: string }>('testData');
        assert.deepStrictEqual(data, { key: 'value1' });
    });

    it('should return true if data exists', function() {
        Scope.set('testData', { key: 'value' });
        assert.strictEqual(Scope.has('testData'), true);
    });

    it('should return false if data does not exist', function() {
        assert.strictEqual(Scope.has('nonExistentData'), false);
    });

    it('should return null for non-existent data', function() {
        const data = Scope.get('nonExistentData');
        assert.strictEqual(data, null);
    });

    it('should clear data by name', function() {
        Scope.set('testData', { key: 'value' });
        Scope.clear('testData');

        const data = Scope.get('testData');
        assert.strictEqual(data, null);
    });

    it('should add to an array in scope', function() {
        const result1 = Scope.addToArray('testArray', 'value1');
        const result2 = Scope.addToArray('testArray', 'value2');

        assert.strictEqual(result1, true);
        assert.strictEqual(result2, true);

        const array = Scope.getArray<string>('testArray');
        assert.deepStrictEqual(array, ['value1', 'value2']);
    });

    it('should not add to non-array data', function() {
        Scope.set('testData', { key: 'value' });
        const result = Scope.addToArray('testData', 'value2');

        assert.strictEqual(result, false);
    });

    it('should remove from an array in scope', function() {
        Scope.addToArray('testArray', 'value1');
        Scope.addToArray('testArray', 'value2');

        const result = Scope.removeFromArray('testArray', 'value1');
        assert.strictEqual(result, true);

        const array = Scope.getArray<string>('testArray');
        assert.deepStrictEqual(array, ['value2']);
    });

    it('should not remove from non-array data', function() {
        Scope.set('testData', { key: 'value' });
        const result = Scope.removeFromArray('testData', 'value2');

        assert.strictEqual(result, false);
    });

    it('should return array from scope', function() {
        Scope.addToArray('testArray', 'value1');
        Scope.addToArray('testArray', 'value2');

        const array = Scope.getArray<string>('testArray');
        assert.deepStrictEqual(array, ['value1', 'value2']);
    });

    it('should return null if scope data is not an array', function() {
        Scope.set('testData', { key: 'value' });

        const array = Scope.getArray<string>('testData');
        assert.strictEqual(array, null);
    });

    it('should return array element by index', function() {
        Scope.addToArray('testArray', 'value1');
        Scope.addToArray('testArray', 'value2');

        const element = Scope.getArrayFromIndex<string>('testArray', 1);
        assert.strictEqual(element, 'value2');
    });

    it('should return null for out of bounds index', function() {
        Scope.addToArray('testArray', 'value1');

        const element = Scope.getArrayFromIndex<string>('testArray', 2);
        assert.strictEqual(element, null);
    });
});
