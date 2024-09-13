"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = require("assert");
const metadata_decorator_1 = require("../../decorators/metadata.decorator");
describe('SetMetadata Decorator', () => {
    it('should set metadata on a class', () => {
        const METADATA_KEY = 'custom:metadata';
        const METADATA_VALUE = 'someValue';
        let TestClass = class TestClass {
        };
        TestClass = tslib_1.__decorate([
            (0, metadata_decorator_1.SetMetadata)(METADATA_KEY, METADATA_VALUE)
        ], TestClass);
        const metadata = Reflect.getMetadata(METADATA_KEY, TestClass);
        assert_1.strict.strictEqual(metadata, METADATA_VALUE);
    });
    it('should set metadata on a method', () => {
        const METADATA_KEY = 'custom:metadata';
        const METADATA_VALUE = 'someMethodValue';
        class TestClass {
            testMethod() { }
        }
        tslib_1.__decorate([
            (0, metadata_decorator_1.SetMetadata)(METADATA_KEY, METADATA_VALUE),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestClass.prototype, "testMethod", null);
        const methodMetadata = Reflect.getMetadata(METADATA_KEY, TestClass.prototype.testMethod);
        assert_1.strict.strictEqual(methodMetadata, METADATA_VALUE);
    });
    it('should set different metadata on multiple methods', () => {
        const METADATA_KEY1 = 'custom:metadata1';
        const METADATA_VALUE1 = 'methodValue1';
        const METADATA_KEY2 = 'custom:metadata2';
        const METADATA_VALUE2 = 'methodValue2';
        class TestClass {
            methodOne() { }
            methodTwo() { }
        }
        tslib_1.__decorate([
            (0, metadata_decorator_1.SetMetadata)(METADATA_KEY1, METADATA_VALUE1),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestClass.prototype, "methodOne", null);
        tslib_1.__decorate([
            (0, metadata_decorator_1.SetMetadata)(METADATA_KEY2, METADATA_VALUE2),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestClass.prototype, "methodTwo", null);
        const methodOneMetadata = Reflect.getMetadata(METADATA_KEY1, TestClass.prototype.methodOne);
        const methodTwoMetadata = Reflect.getMetadata(METADATA_KEY2, TestClass.prototype.methodTwo);
        assert_1.strict.strictEqual(methodOneMetadata, METADATA_VALUE1);
        assert_1.strict.strictEqual(methodTwoMetadata, METADATA_VALUE2);
    });
    it('should return the decorator with KEY property', () => {
        const METADATA_KEY = 'custom:metadataKey';
        const METADATA_VALUE = 'keyValue';
        const decorator = (0, metadata_decorator_1.SetMetadata)(METADATA_KEY, METADATA_VALUE);
        assert_1.strict.strictEqual(decorator.KEY, METADATA_KEY);
    });
    it('should apply the decorator on both methods and classes', () => {
        const METADATA_KEY = 'custom:universal';
        const METADATA_VALUE = 'universalValue';
        let TestClass = class TestClass {
            method() { }
        };
        tslib_1.__decorate([
            (0, metadata_decorator_1.SetMetadata)(METADATA_KEY, METADATA_VALUE),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestClass.prototype, "method", null);
        TestClass = tslib_1.__decorate([
            (0, metadata_decorator_1.SetMetadata)(METADATA_KEY, METADATA_VALUE)
        ], TestClass);
        const classMetadata = Reflect.getMetadata(METADATA_KEY, TestClass);
        const methodMetadata = Reflect.getMetadata(METADATA_KEY, TestClass.prototype.method);
        assert_1.strict.strictEqual(classMetadata, METADATA_VALUE);
        assert_1.strict.strictEqual(methodMetadata, METADATA_VALUE);
    });
    it('should return descriptor when applied on a method', () => {
        const METADATA_KEY = 'custom:metadata';
        const METADATA_VALUE = 'descriptorValue';
        class TestClass {
            method() { }
        }
        tslib_1.__decorate([
            (0, metadata_decorator_1.SetMetadata)(METADATA_KEY, METADATA_VALUE),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestClass.prototype, "method", null);
        const descriptor = Object.getOwnPropertyDescriptor(TestClass.prototype, 'method');
        assert_1.strict.notStrictEqual(descriptor, undefined);
        assert_1.strict.strictEqual(typeof descriptor.value, 'function');
    });
});
