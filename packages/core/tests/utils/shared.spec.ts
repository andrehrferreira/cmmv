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
});
