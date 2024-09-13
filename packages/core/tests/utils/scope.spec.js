"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const scope_1 = require("../../lib/scope");
describe('Scope', function () {
    beforeEach(function () {
        // Clear any existing data before each test to ensure isolation
        scope_1.Scope.clear('testData');
        scope_1.Scope.clear('testArray');
    });
    it('should set and retrieve data by name', function () {
        const result = scope_1.Scope.set('testData', { key: 'value' });
        assert_1.strict.strictEqual(result, true);
        const data = scope_1.Scope.get('testData');
        assert_1.strict.deepStrictEqual(data, { key: 'value' });
    });
    it('should not overwrite existing data', function () {
        scope_1.Scope.set('testData', { key: 'value1' });
        const result = scope_1.Scope.set('testData', { key: 'value2' });
        assert_1.strict.strictEqual(result, false);
        const data = scope_1.Scope.get('testData');
        assert_1.strict.deepStrictEqual(data, { key: 'value1' });
    });
    it('should return true if data exists', function () {
        scope_1.Scope.set('testData', { key: 'value' });
        assert_1.strict.strictEqual(scope_1.Scope.has('testData'), true);
    });
    it('should return false if data does not exist', function () {
        assert_1.strict.strictEqual(scope_1.Scope.has('nonExistentData'), false);
    });
    it('should return null for non-existent data', function () {
        const data = scope_1.Scope.get('nonExistentData');
        assert_1.strict.strictEqual(data, null);
    });
    it('should clear data by name', function () {
        scope_1.Scope.set('testData', { key: 'value' });
        scope_1.Scope.clear('testData');
        const data = scope_1.Scope.get('testData');
        assert_1.strict.strictEqual(data, null);
    });
    it('should add to an array in scope', function () {
        const result1 = scope_1.Scope.addToArray('testArray', 'value1');
        const result2 = scope_1.Scope.addToArray('testArray', 'value2');
        assert_1.strict.strictEqual(result1, true);
        assert_1.strict.strictEqual(result2, true);
        const array = scope_1.Scope.getArray('testArray');
        assert_1.strict.deepStrictEqual(array, ['value1', 'value2']);
    });
    it('should not add to non-array data', function () {
        scope_1.Scope.set('testData', { key: 'value' });
        const result = scope_1.Scope.addToArray('testData', 'value2');
        assert_1.strict.strictEqual(result, false);
    });
    it('should remove from an array in scope', function () {
        scope_1.Scope.addToArray('testArray', 'value1');
        scope_1.Scope.addToArray('testArray', 'value2');
        const result = scope_1.Scope.removeFromArray('testArray', 'value1');
        assert_1.strict.strictEqual(result, true);
        const array = scope_1.Scope.getArray('testArray');
        assert_1.strict.deepStrictEqual(array, ['value2']);
    });
    it('should not remove from non-array data', function () {
        scope_1.Scope.set('testData', { key: 'value' });
        const result = scope_1.Scope.removeFromArray('testData', 'value2');
        assert_1.strict.strictEqual(result, false);
    });
    it('should return array from scope', function () {
        scope_1.Scope.addToArray('testArray', 'value1');
        scope_1.Scope.addToArray('testArray', 'value2');
        const array = scope_1.Scope.getArray('testArray');
        assert_1.strict.deepStrictEqual(array, ['value1', 'value2']);
    });
    it('should return null if scope data is not an array', function () {
        scope_1.Scope.set('testData', { key: 'value' });
        const array = scope_1.Scope.getArray('testData');
        assert_1.strict.strictEqual(array, null);
    });
    it('should return array element by index', function () {
        scope_1.Scope.addToArray('testArray', 'value1');
        scope_1.Scope.addToArray('testArray', 'value2');
        const element = scope_1.Scope.getArrayFromIndex('testArray', 1);
        assert_1.strict.strictEqual(element, 'value2');
    });
    it('should return null for out of bounds index', function () {
        scope_1.Scope.addToArray('testArray', 'value1');
        const element = scope_1.Scope.getArrayFromIndex('testArray', 2);
        assert_1.strict.strictEqual(element, null);
    });
});
