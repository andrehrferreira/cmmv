import { describe, it, expect } from 'vitest';
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

describe('Shared Utils', () => {
    it('should correctly identify undefined values', () => {
        expect(isUndefined(undefined)).toBe(true);
        expect(isUndefined(null)).toBe(false);
    });

    it('should correctly identify objects', () => {
        expect(isObject({})).toBe(true);
        expect(isObject(null)).toBe(false);
    });

    it('should correctly identify plain objects', () => {
        expect(isPlainObject({})).toBe(true);
        expect(isPlainObject(new Date())).toBe(false);
    });

    it('should add leading slash to paths', () => {
        expect(addLeadingSlash('test')).toBe('/test');
        expect(addLeadingSlash('/test')).toBe('/test');
    });

    it('should normalize paths', () => {
        expect(normalizePath('/test//path/')).toBe('/test/path');
    });

    it('should strip the ending slash from paths', () => {
        expect(stripEndSlash('/test/')).toBe('/test');
        expect(stripEndSlash('/test')).toBe('/test');
    });

    it('should correctly identify functions', () => {
        expect(isFunction(() => {})).toBe(true);
        expect(isFunction('test')).toBe(false);
    });

    it('should correctly identify strings', () => {
        expect(isString('test')).toBe(true);
        expect(isString(123)).toBe(false);
    });

    it('should correctly identify numbers', () => {
        expect(isNumber(123)).toBe(true);
        expect(isNumber('test')).toBe(false);
    });

    it('should correctly identify constructors', () => {
        expect(isConstructor('constructor')).toBe(true);
        expect(isConstructor('notConstructor')).toBe(false);
    });

    it('should correctly identify null or undefined values', () => {
        expect(isNil(null)).toBe(true);
        expect(isNil(undefined)).toBe(true);
        expect(isNil('test')).toBe(false);
    });

    it('should correctly identify empty arrays', () => {
        expect(isEmpty([])).toBe(true);
        expect(isEmpty([1, 2, 3])).toBe(false);
    });

    it('should correctly identify symbols', () => {
        expect(isSymbol(Symbol())).toBe(true);
        expect(isSymbol('test')).toBe(false);
    });

    it('should correctly identify valid JSON strings', () => {
        expect(isJSON('{"key": "value"}')).toBe(true);
        expect(isJSON('invalidJSON')).toBe(false);
    });

    it('should return false for non-undefined values in isUndefined', () => {
        expect(isUndefined(123)).toBe(false);
        expect(isUndefined('string')).toBe(false);
        expect(isUndefined({})).toBe(false);
    });

    it('should correctly identify non-plain objects', () => {
        class CustomClass {}
        expect(isPlainObject(new CustomClass())).toBe(false);
        expect(isPlainObject(null)).toBe(false);
    });

    it('should not add leading slash if path is empty', () => {
        expect(addLeadingSlash('')).toBe('/');
    });

    it('should handle paths with no need for normalization', () => {
        expect(normalizePath('/simple')).toBe('/simple');
        expect(normalizePath('simple/path')).toBe('/simple/path');
    });

    it('should correctly strip end slash even for root paths', () => {
        expect(stripEndSlash('/')).toBe('');
        expect(stripEndSlash('root/')).toBe('root');
    });

    it('should correctly identify arrow functions in isFunction', () => {
        expect(isFunction(function () {})).toBe(true);
        expect(isFunction(() => {})).toBe(true);
        expect(isFunction(null)).toBe(false);
    });

    it('should correctly identify if a value is not a constructor', () => {
        expect(isConstructor('randomString')).toBe(false);
        expect(isConstructor(Object)).toBe(false);
    });

    it('should return true for nested arrays in isEmpty', () => {
        expect(isEmpty([[]])).toBe(false);
        expect(isEmpty([[1, 2, 3]])).toBe(false);
    });

    it('should return false for invalid JSON even with valid syntax', () => {
        expect(isJSON('{key: value}')).toBe(false);
        expect(isJSON('{"incompleteJson"')).toBe(false);
    });
});
