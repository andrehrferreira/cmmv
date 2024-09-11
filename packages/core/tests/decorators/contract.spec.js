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
        const fieldMetadata = Reflect.getMetadata(contract_decorator_1.FIELD_METADATA, TestClass.prototype, 'testField');
        assert_1.strict.strictEqual(fieldMetadata.protoType, 'string');
        assert_1.strict.strictEqual(fieldMetadata.protoRepeated, true);
        assert_1.strict.strictEqual(fieldMetadata.defaultValue, 'default');
        assert_1.strict.strictEqual(fieldMetadata.index, true);
        assert_1.strict.strictEqual(fieldMetadata.unique, false);
    });
    it('should handle multiple fields on the same class', function () {
        class TestClass {
        }
        tslib_1.__decorate([
            (0, contract_decorator_1.ContractField)({ protoType: 'string' }),
            tslib_1.__metadata("design:type", String)
        ], TestClass.prototype, "field1", void 0);
        tslib_1.__decorate([
            (0, contract_decorator_1.ContractField)({ protoType: 'int32', defaultValue: 42 }),
            tslib_1.__metadata("design:type", Number)
        ], TestClass.prototype, "field2", void 0);
        const field1Metadata = Reflect.getMetadata(contract_decorator_1.FIELD_METADATA, TestClass.prototype, 'field1');
        const field2Metadata = Reflect.getMetadata(contract_decorator_1.FIELD_METADATA, TestClass.prototype, 'field2');
        assert_1.strict.strictEqual(field1Metadata.protoType, 'string');
        assert_1.strict.strictEqual(field2Metadata.protoType, 'int32');
        assert_1.strict.strictEqual(field2Metadata.defaultValue, 42);
    });
});
