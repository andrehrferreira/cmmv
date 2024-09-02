import { strict as assert } from 'assert';

import {
    Contract,
    ContractField,
    CONTRACT_WATERMARK,
    CONTROLLER_NAME_METADATA,
    PROTO_PATH_METADATA,
    PROTO_PACKAGE_METADATA,
    DATABASE_TYPE_METADATA,
    DIRECTMESSAGE_METADATA,
    GENERATE_CONTROLLER_METADATA,
    AUTH_METADATA,
    CONTROLLER_CUSTOM_PATH_METADATA,
    FIELD_METADATA,
    ContractOptions,
    ContractFieldOptions,
} from '../../decorators/contract.decorator';

describe('Contract Decorator', function () {
    it('should apply default metadata when no options are provided', function () {
        @Contract()
        class TestClass {}

        assert.strictEqual(Reflect.getMetadata(CONTRACT_WATERMARK, TestClass), true);
        assert.strictEqual(Reflect.getMetadata(CONTROLLER_NAME_METADATA, TestClass), 'DefaultContract');
        assert.strictEqual(Reflect.getMetadata(PROTO_PATH_METADATA, TestClass), 'contract.proto');
        assert.strictEqual(Reflect.getMetadata(PROTO_PACKAGE_METADATA, TestClass), '');
        assert.strictEqual(Reflect.getMetadata(DATABASE_TYPE_METADATA, TestClass), 'mongodb');
        assert.strictEqual(Reflect.getMetadata(DIRECTMESSAGE_METADATA, TestClass), false);
        assert.strictEqual(Reflect.getMetadata(GENERATE_CONTROLLER_METADATA, TestClass), true);
        assert.strictEqual(Reflect.getMetadata(AUTH_METADATA, TestClass), true);
        assert.strictEqual(Reflect.getMetadata(CONTROLLER_CUSTOM_PATH_METADATA, TestClass), '');
    });

    it('should apply provided metadata options', function () {
        const options: ContractOptions = {
            controllerName: 'CustomContract',
            protoPath: 'custom.proto',
            protoPackage: 'custom.package',
            databaseType: 'typeorm',
            directMessage: true,
            generateController: false,
            auth: false,
            controllerCustomPath: 'custom/path',
        };

        @Contract(options)
        class TestClass {}

        assert.strictEqual(Reflect.getMetadata(CONTRACT_WATERMARK, TestClass), true);
        assert.strictEqual(Reflect.getMetadata(CONTROLLER_NAME_METADATA, TestClass), 'CustomContract');
        assert.strictEqual(Reflect.getMetadata(PROTO_PATH_METADATA, TestClass), 'custom.proto');
        assert.strictEqual(Reflect.getMetadata(PROTO_PACKAGE_METADATA, TestClass), 'custom.package');
        assert.strictEqual(Reflect.getMetadata(DATABASE_TYPE_METADATA, TestClass), 'typeorm');
        assert.strictEqual(Reflect.getMetadata(DIRECTMESSAGE_METADATA, TestClass), true);
        assert.strictEqual(Reflect.getMetadata(GENERATE_CONTROLLER_METADATA, TestClass), false);
        assert.strictEqual(Reflect.getMetadata(AUTH_METADATA, TestClass), false);
        assert.strictEqual(Reflect.getMetadata(CONTROLLER_CUSTOM_PATH_METADATA, TestClass), 'custom/path');
    });
});

describe('ContractField Decorator', function () {
    it('should apply field metadata to class properties', function () {
        const options: ContractFieldOptions = {
            protoType: 'string',
            protoRepeated: true,
            defaultValue: 'default',
            index: true,
            unique: false,
        };

        class TestClass {
            @ContractField(options)
            public testField: string;
        }

        const fieldMetadata = Reflect.getMetadata(FIELD_METADATA, TestClass.prototype);
        
        assert(Array.isArray(fieldMetadata), 'Field metadata should be an array');
        assert.strictEqual(fieldMetadata.length, 1, 'Field metadata should contain one entry');

        const [field] = fieldMetadata;

        assert.strictEqual(field.propertyKey, 'testField');
        assert.strictEqual(field.protoType, 'string');
        assert.strictEqual(field.protoRepeated, true);
        assert.strictEqual(field.defaultValue, 'default');
        assert.strictEqual(field.index, true);
        assert.strictEqual(field.unique, false);
    });

    it('should handle multiple fields on the same class', function () {
        const options1: ContractFieldOptions = {
            protoType: 'string',
        };

        const options2: ContractFieldOptions = {
            protoType: 'int32',
            defaultValue: 42,
        };

        class TestClass {
            @ContractField(options1)
            public field1: string;

            @ContractField(options2)
            public field2: number;
        }

        const fieldMetadata = Reflect.getMetadata(FIELD_METADATA, TestClass.prototype);
        
        assert(Array.isArray(fieldMetadata), 'Field metadata should be an array');
        assert.strictEqual(fieldMetadata.length, 2, 'Field metadata should contain two entries');

        const [field1, field2] = fieldMetadata;

        assert.strictEqual(field1.propertyKey, 'field1');
        assert.strictEqual(field1.protoType, 'string');

        assert.strictEqual(field2.propertyKey, 'field2');
        assert.strictEqual(field2.protoType, 'int32');
        assert.strictEqual(field2.defaultValue, 42);
    });

    it('should set default values correctly when options are not provided', function () {
        class DefaultFieldClass {
            @ContractField({ protoType: 'string' })
            public field: string;
        }

        const fieldMetadata = Reflect.getMetadata(FIELD_METADATA, DefaultFieldClass.prototype);
        const field = fieldMetadata[0];

        assert.strictEqual(field.propertyKey, 'field');
        assert.strictEqual(field.protoType, 'string');
        assert.strictEqual(field.protoRepeated, undefined);
        assert.strictEqual(field.defaultValue, undefined);
        assert.strictEqual(field.index, undefined);
        assert.strictEqual(field.unique, undefined);
    });

    it('should correctly override default values with provided options', function () {
        const options: ContractFieldOptions = {
            protoType: 'int32',
            protoRepeated: true,
            defaultValue: 0,
            index: true,
            unique: false,
        };

        class CustomFieldClass {
            @ContractField(options)
            public field: number;
        }

        const fieldMetadata = Reflect.getMetadata(FIELD_METADATA, CustomFieldClass.prototype);
        const field = fieldMetadata[0];

        assert.strictEqual(field.propertyKey, 'field');
        assert.strictEqual(field.protoType, 'int32');
        assert.strictEqual(field.protoRepeated, true);
        assert.strictEqual(field.defaultValue, 0);
        assert.strictEqual(field.index, true);
        assert.strictEqual(field.unique, false);
    });

    it('should handle multiple fields with varying options', function () {
        class MultipleFieldClass {
            @ContractField({ protoType: 'string' })
            public field1: string;

            @ContractField({
                protoType: 'int32',
                defaultValue: 100,
                index: true,
            })
            public field2: number;

            @ContractField({
                protoType: 'bool',
                protoRepeated: true,
            })
            public field3: boolean[];
        }

        const fieldMetadata = Reflect.getMetadata(FIELD_METADATA, MultipleFieldClass.prototype);

        assert.strictEqual(fieldMetadata.length, 3);

        const [field1, field2, field3] = fieldMetadata;

        // Field1
        assert.strictEqual(field1.propertyKey, 'field1');
        assert.strictEqual(field1.protoType, 'string');
        assert.strictEqual(field1.defaultValue, undefined);

        // Field2
        assert.strictEqual(field2.propertyKey, 'field2');
        assert.strictEqual(field2.protoType, 'int32');
        assert.strictEqual(field2.defaultValue, 100);
        assert.strictEqual(field2.index, true);

        // Field3
        assert.strictEqual(field3.propertyKey, 'field3');
        assert.strictEqual(field3.protoType, 'bool');
        assert.strictEqual(field3.protoRepeated, true);
    });
});
