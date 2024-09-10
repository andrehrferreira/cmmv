import { strict as assert } from 'assert';
import {
    Contract,
    ContractField,
    CONTRACT_WATERMARK,
    CONTROLLER_NAME_METADATA,
    PROTO_PATH_METADATA,
    PROTO_PACKAGE_METADATA,
    DATABASE_TYPE_METADATA,
    FIELD_METADATA,
} from '../../decorators/contract.decorator';

describe('Contract Decorator', function () {
    it('should apply default metadata when no options are provided', function () {
        @Contract()
        class TestClass {}

        assert.strictEqual(
            Reflect.getMetadata(CONTRACT_WATERMARK, TestClass),
            true,
        );
        assert.strictEqual(
            Reflect.getMetadata(CONTROLLER_NAME_METADATA, TestClass),
            'DefaultContract',
        );
        assert.strictEqual(
            Reflect.getMetadata(PROTO_PATH_METADATA, TestClass),
            'contract.proto',
        );
        assert.strictEqual(
            Reflect.getMetadata(PROTO_PACKAGE_METADATA, TestClass),
            '',
        );
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

        @Contract(options)
        class TestClass {}

        assert.strictEqual(
            Reflect.getMetadata(CONTRACT_WATERMARK, TestClass),
            true,
        );
        assert.strictEqual(
            Reflect.getMetadata(CONTROLLER_NAME_METADATA, TestClass),
            'CustomContract',
        );
        assert.strictEqual(
            Reflect.getMetadata(PROTO_PATH_METADATA, TestClass),
            'custom.proto',
        );
        assert.strictEqual(
            Reflect.getMetadata(PROTO_PACKAGE_METADATA, TestClass),
            'custom.package',
        );
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
            @ContractField(options)
            public testField: string;
        }

        const fieldMetadata = Reflect.getMetadata(
            FIELD_METADATA,
            TestClass.prototype,
            'testField', // Precisamos usar o nome do campo diretamente aqui
        );

        assert.strictEqual(fieldMetadata.protoType, 'string');
        assert.strictEqual(fieldMetadata.protoRepeated, true);
        assert.strictEqual(fieldMetadata.defaultValue, 'default');
        assert.strictEqual(fieldMetadata.index, true);
        assert.strictEqual(fieldMetadata.unique, false);
    });

    it('should handle multiple fields on the same class', function () {
        class TestClass {
            @ContractField({ protoType: 'string' })
            public field1: string;

            @ContractField({ protoType: 'int32', defaultValue: 42 })
            public field2: number;
        }

        const field1Metadata = Reflect.getMetadata(
            FIELD_METADATA,
            TestClass.prototype,
            'field1',
        );

        const field2Metadata = Reflect.getMetadata(
            FIELD_METADATA,
            TestClass.prototype,
            'field2',
        );

        assert.strictEqual(field1Metadata.protoType, 'string');
        assert.strictEqual(field2Metadata.protoType, 'int32');
        assert.strictEqual(field2Metadata.defaultValue, 42);
    });
});
