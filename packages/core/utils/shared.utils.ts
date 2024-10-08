//@see https://github.com/nestjs/nest/blob/master/packages/common/utils/shared.utils.ts

/* eslint-disable @typescript-eslint/no-use-before-define */

export const isUndefined = (obj: unknown): obj is undefined =>
    typeof obj === 'undefined';

export const isObject = (fn: unknown): fn is object =>
    !isNil(fn) && typeof fn === 'object';

export const isPlainObject = (fn: unknown): fn is object => {
    if (!isObject(fn)) return false;

    const proto = Object.getPrototypeOf(fn);

    if (proto === null) return true;

    const ctor =
        Object.prototype.hasOwnProperty.call(proto, 'constructor') &&
        proto.constructor;
    return (
        typeof ctor === 'function' &&
        ctor instanceof ctor &&
        Function.prototype.toString.call(ctor) ===
            Function.prototype.toString.call(Object)
    );
};

export const addLeadingSlash = (path = ''): string =>
    path.startsWith('/') ? path : '/' + path;

export const normalizePath = (path = ''): string =>
    path
        ? `/${path.replace(/^\/+/, '').replace(/\/+$/, '').replace(/\/+/g, '/')}`
        : '/';

export const stripEndSlash = (path: string): string =>
    path.endsWith('/') ? path.slice(0, -1) : path;

export const isFunction = (val: unknown): val is Function =>
    typeof val === 'function';

export const isString = (val: unknown): val is string =>
    typeof val === 'string';

export const isNumber = (val: unknown): val is number =>
    typeof val === 'number';

export const isConstructor = (val: unknown): boolean => val === 'constructor';

export const isNil = (val: unknown): val is null | undefined =>
    isUndefined(val) || val === null;

export const isEmpty = (array: unknown[]): boolean =>
    !(array && array.length > 0);

export const isSymbol = (val: unknown): val is symbol =>
    typeof val === 'symbol';

export const isJSON = (val: unknown): boolean => {
    if (typeof val !== 'string') return false;

    try {
        JSON.parse(val);
        return true;
    } catch (e) {
        return false;
    }
};
