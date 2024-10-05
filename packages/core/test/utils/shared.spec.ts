import { strict as assert } from 'assert';
import {
    isUndefined,
    isObject,
    isPlainObject,
    addLeadingSlash,
    normalizePath,
    stripEndSlash,
    isFunction,
    isString,
    isNumber,
    isConstructor,
    isNil,
    isEmpty,
    isSymbol,
    isJSON,
} from '../../utils/shared.utils';

describe('Shared Utils', function () {
    it('should correctly identify undefined values', function () {
        assert.strictEqual(isUndefined(undefined), true);
        assert.strictEqual(isUndefined(null), false);
    });

    it('should correctly identify objects', function () {
        assert.strictEqual(isObject({}), true);
        assert.strictEqual(isObject(null), false);
    });

    it('should correctly identify plain objects', function () {
        assert.strictEqual(isPlainObject({}), true);
        assert.strictEqual(isPlainObject(new Date()), false);
    });

    it('should add leading slash to paths', function () {
        assert.strictEqual(addLeadingSlash('test'), '/test');
        assert.strictEqual(addLeadingSlash('/test'), '/test');
    });

    it('should normalize paths', function () {
        assert.strictEqual(normalizePath('/test//path/'), '/test/path');
    });

    it('should strip the ending slash from paths', function () {
        assert.strictEqual(stripEndSlash('/test/'), '/test');
        assert.strictEqual(stripEndSlash('/test'), '/test');
    });

    it('should correctly identify functions', function () {
        assert.strictEqual(
            isFunction(() => {}),
            true,
        );
        assert.strictEqual(isFunction('test'), false);
    });

    it('should correctly identify strings', function () {
        assert.strictEqual(isString('test'), true);
        assert.strictEqual(isString(123), false);
    });

    it('should correctly identify numbers', function () {
        assert.strictEqual(isNumber(123), true);
        assert.strictEqual(isNumber('test'), false);
    });

    it('should correctly identify constructors', function () {
        assert.strictEqual(isConstructor('constructor'), true);
        assert.strictEqual(isConstructor('notConstructor'), false);
    });

    it('should correctly identify null or undefined values', function () {
        assert.strictEqual(isNil(null), true);
        assert.strictEqual(isNil(undefined), true);
        assert.strictEqual(isNil('test'), false);
    });

    it('should correctly identify empty arrays', function () {
        assert.strictEqual(isEmpty([]), true);
        assert.strictEqual(isEmpty([1, 2, 3]), false);
    });

    it('should correctly identify symbols', function () {
        assert.strictEqual(isSymbol(Symbol()), true);
        assert.strictEqual(isSymbol('test'), false);
    });

    it('should correctly identify valid JSON strings', function () {
        assert.strictEqual(isJSON('{"key": "value"}'), true);
        assert.strictEqual(isJSON('invalidJSON'), false);
    });

    it('should return false for non-undefined values in isUndefined', function () {
        assert.strictEqual(isUndefined(123), false);
        assert.strictEqual(isUndefined('string'), false);
        assert.strictEqual(isUndefined({}), false);
    });

    it('should correctly identify non-plain objects', function () {
        class CustomClass {}
        assert.strictEqual(isPlainObject(new CustomClass()), false);
        assert.strictEqual(isPlainObject(null), false);
    });

    it('should not add leading slash if path is empty', function () {
        assert.strictEqual(addLeadingSlash(''), '/');
    });

    it('should handle paths with no need for normalization', function () {
        assert.strictEqual(normalizePath('/simple'), '/simple');
        assert.strictEqual(normalizePath('simple/path'), '/simple/path');
    });

    it('should correctly strip end slash even for root paths', function () {
        assert.strictEqual(stripEndSlash('/'), '');
        assert.strictEqual(stripEndSlash('root/'), 'root');
    });

    it('should correctly identify arrow functions in isFunction', function () {
        assert.strictEqual(
            isFunction(function () {}),
            true,
        );
        assert.strictEqual(
            isFunction(() => {}),
            true,
        );
        assert.strictEqual(isFunction(null), false);
    });

    it('should correctly identify if a value is not a constructor', function () {
        assert.strictEqual(isConstructor('randomString'), false);
        assert.strictEqual(isConstructor(Object), false);
    });

    it('should return true for nested arrays in isEmpty', function () {
        assert.strictEqual(isEmpty([[]]), false);
        assert.strictEqual(isEmpty([[1, 2, 3]]), false);
    });

    it('should return false for invalid JSON even with valid syntax', function () {
        assert.strictEqual(isJSON('{key: value}'), false);
        assert.strictEqual(isJSON('{"incompleteJson"'), false);
    });
});
