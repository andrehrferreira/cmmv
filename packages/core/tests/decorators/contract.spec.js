"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = require("assert");
const contract_decorator_1 = require("../../decorators/contract.decorator");
describe('Contract Decorator', function () {
    it('should apply default metadata when no options are provided', function () {
        let TestClass = class TestClass {
        };
        TestClass = tslib_1.__decorate([
            (0, contract_decorator_1.Contract)()
        ], TestClass);
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.CONTRACT_WATERMARK, TestClass), true);
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.CONTROLLER_NAME_METADATA, TestClass), 'DefaultContract');
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.PROTO_PATH_METADATA, TestClass), 'contract.proto');
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.PROTO_PACKAGE_METADATA, TestClass), '');
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.DATABASE_TYPE_METADATA, TestClass), 'mongodb');
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.DIRECTMESSAGE_METADATA, TestClass), false);
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.GENERATE_CONTROLLER_METADATA, TestClass), true);
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.AUTH_METADATA, TestClass), true);
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.CONTROLLER_CUSTOM_PATH_METADATA, TestClass), '');
    });
    it('should apply provided metadata options', function () {
        const options = {
            controllerName: 'CustomContract',
            protoPath: 'custom.proto',
            protoPackage: 'custom.package',
            directMessage: true,
            generateController: false,
            auth: false,
            controllerCustomPath: 'custom/path',
        };
        let TestClass = class TestClass {
        };
        TestClass = tslib_1.__decorate([
            (0, contract_decorator_1.Contract)(options)
        ], TestClass);
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.CONTRACT_WATERMARK, TestClass), true);
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.CONTROLLER_NAME_METADATA, TestClass), 'CustomContract');
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.PROTO_PATH_METADATA, TestClass), 'custom.proto');
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.PROTO_PACKAGE_METADATA, TestClass), 'custom.package');
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.DATABASE_TYPE_METADATA, TestClass), 'typeorm');
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.DIRECTMESSAGE_METADATA, TestClass), true);
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.GENERATE_CONTROLLER_METADATA, TestClass), false);
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.AUTH_METADATA, TestClass), false);
        assert_1.strict.strictEqual(Reflect.getMetadata(contract_decorator_1.CONTROLLER_CUSTOM_PATH_METADATA, TestClass), 'custom/path');
    });
});
describe('ContractField Decorator', function () {
    it('should apply field metadata to class properties', function () {
        const options = {
            protoType: 'string',
            protoRepeated: true,
            defaultValue: 'default',
            index: true,
            unique: false,
        };
        class TestClass {
        }
        tslib_1.__decorate([
            (0, contract_decorator_1.ContractField)(options),
            tslib_1.__metadata("design:type", String)
        ], TestClass.prototype, "testField", void 0);
        const fieldMetadata = Reflect.getMetadata(contract_decorator_1.FIELD_METADATA, TestClass.prototype);
        (0, assert_1.strict)(Array.isArray(fieldMetadata), 'Field metadata should be an array');
        assert_1.strict.strictEqual(fieldMetadata.length, 1, 'Field metadata should contain one entry');
        const [field] = fieldMetadata;
        assert_1.strict.strictEqual(field.propertyKey, 'testField');
        assert_1.strict.strictEqual(field.protoType, 'string');
        assert_1.strict.strictEqual(field.protoRepeated, true);
        assert_1.strict.strictEqual(field.defaultValue, 'default');
        assert_1.strict.strictEqual(field.index, true);
        assert_1.strict.strictEqual(field.unique, false);
    });
    it('should handle multiple fields on the same class', function () {
        const options1 = {
            protoType: 'string',
        };
        const options2 = {
            protoType: 'int32',
            defaultValue: 42,
        };
        class TestClass {
        }
        tslib_1.__decorate([
            (0, contract_decorator_1.ContractField)(options1),
            tslib_1.__metadata("design:type", String)
        ], TestClass.prototype, "field1", void 0);
        tslib_1.__decorate([
            (0, contract_decorator_1.ContractField)(options2),
            tslib_1.__metadata("design:type", Number)
        ], TestClass.prototype, "field2", void 0);
        const fieldMetadata = Reflect.getMetadata(contract_decorator_1.FIELD_METADATA, TestClass.prototype);
        (0, assert_1.strict)(Array.isArray(fieldMetadata), 'Field metadata should be an array');
        assert_1.strict.strictEqual(fieldMetadata.length, 2, 'Field metadata should contain two entries');
        const [field1, field2] = fieldMetadata;
        assert_1.strict.strictEqual(field1.propertyKey, 'field1');
        assert_1.strict.strictEqual(field1.protoType, 'string');
        assert_1.strict.strictEqual(field2.propertyKey, 'field2');
        assert_1.strict.strictEqual(field2.protoType, 'int32');
        assert_1.strict.strictEqual(field2.defaultValue, 42);
    });
    it('should set default values correctly when options are not provided', function () {
        class DefaultFieldClass {
        }
        tslib_1.__decorate([
            (0, contract_decorator_1.ContractField)({ protoType: 'string' }),
            tslib_1.__metadata("design:type", String)
        ], DefaultFieldClass.prototype, "field", void 0);
        const fieldMetadata = Reflect.getMetadata(contract_decorator_1.FIELD_METADATA, DefaultFieldClass.prototype);
        const field = fieldMetadata[0];
        assert_1.strict.strictEqual(field.propertyKey, 'field');
        assert_1.strict.strictEqual(field.protoType, 'string');
        assert_1.strict.strictEqual(field.protoRepeated, undefined);
        assert_1.strict.strictEqual(field.defaultValue, undefined);
        assert_1.strict.strictEqual(field.index, undefined);
        assert_1.strict.strictEqual(field.unique, undefined);
    });
    it('should correctly override default values with provided options', function () {
        const options = {
            protoType: 'int32',
            protoRepeated: true,
            defaultValue: 0,
            index: true,
            unique: false,
        };
        class CustomFieldClass {
        }
        tslib_1.__decorate([
            (0, contract_decorator_1.ContractField)(options),
            tslib_1.__metadata("design:type", Number)
        ], CustomFieldClass.prototype, "field", void 0);
        const fieldMetadata = Reflect.getMetadata(contract_decorator_1.FIELD_METADATA, CustomFieldClass.prototype);
        const field = fieldMetadata[0];
        assert_1.strict.strictEqual(field.propertyKey, 'field');
        assert_1.strict.strictEqual(field.protoType, 'int32');
        assert_1.strict.strictEqual(field.protoRepeated, true);
        assert_1.strict.strictEqual(field.defaultValue, 0);
        assert_1.strict.strictEqual(field.index, true);
        assert_1.strict.strictEqual(field.unique, false);
    });
    it('should handle multiple fields with varying options', function () {
        class MultipleFieldClass {
        }
        tslib_1.__decorate([
            (0, contract_decorator_1.ContractField)({ protoType: 'string' }),
            tslib_1.__metadata("design:type", String)
        ], MultipleFieldClass.prototype, "field1", void 0);
        tslib_1.__decorate([
            (0, contract_decorator_1.ContractField)({
                protoType: 'int32',
                defaultValue: 100,
                index: true,
            }),
            tslib_1.__metadata("design:type", Number)
        ], MultipleFieldClass.prototype, "field2", void 0);
        tslib_1.__decorate([
            (0, contract_decorator_1.ContractField)({
                protoType: 'bool',
                protoRepeated: true,
            }),
            tslib_1.__metadata("design:type", Array)
        ], MultipleFieldClass.prototype, "field3", void 0);
        const fieldMetadata = Reflect.getMetadata(contract_decorator_1.FIELD_METADATA, MultipleFieldClass.prototype);
        assert_1.strict.strictEqual(fieldMetadata.length, 3);
        const [field1, field2, field3] = fieldMetadata;
        // Field1
        assert_1.strict.strictEqual(field1.propertyKey, 'field1');
        assert_1.strict.strictEqual(field1.protoType, 'string');
        assert_1.strict.strictEqual(field1.defaultValue, undefined);
        // Field2
        assert_1.strict.strictEqual(field2.propertyKey, 'field2');
        assert_1.strict.strictEqual(field2.protoType, 'int32');
        assert_1.strict.strictEqual(field2.defaultValue, 100);
        assert_1.strict.strictEqual(field2.index, true);
        // Field3
        assert_1.strict.strictEqual(field3.propertyKey, 'field3');
        assert_1.strict.strictEqual(field3.protoType, 'bool');
        assert_1.strict.strictEqual(field3.protoRepeated, true);
    });
});
