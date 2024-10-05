import { strict as assert } from 'assert';

import {
    Contract,
    ContractField,
    CONTRACT_WATERMARK,
    CONTROLLER_NAME_METADATA,
    PROTO_PATH_METADATA,
    PROTO_PACKAGE_METADATA,
    FIELD_METADATA,
    CONTROLLER_CUSTOM_PATH_METADATA,
    CONTROLLER_IMPORTS,
    AUTH_METADATA,
    CONTROLLER_CACHE,
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

        @Contract()
        class TestClass {
            @ContractField(options)
            public testField: string;
        }

        const contract: any = new TestClass();
        const target = contract.constructor || contract;
        const prototype = target.prototype || contract.prototype;

        const fieldMetadata = Reflect.getMetadata(
            FIELD_METADATA,
            prototype,
        ).find((field: any) => field.propertyKey === 'testField');

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

        const contract: any = new TestClass();
        const target = contract.constructor || contract;
        const prototype = target.prototype || contract.prototype;

        const field1Metadata = Reflect.getMetadata(
            FIELD_METADATA,
            prototype,
        ).find((field: any) => field.propertyKey === 'field1');

        const field2Metadata = Reflect.getMetadata(
            FIELD_METADATA,
            prototype,
        ).find((field: any) => field.propertyKey === 'field2');

        assert.strictEqual(field1Metadata.protoType, 'string');
        assert.strictEqual(field2Metadata.protoType, 'int32');
        assert.strictEqual(field2Metadata.defaultValue, 42);
    });
});

describe('Contract Decorator Additional Tests', function () {
    it('should apply auth and cache metadata when provided', function () {
        const options = {
            controllerName: 'AuthContract',
            protoPath: 'auth.proto',
            protoPackage: 'auth.package',
            auth: true,
            cache: { key: 'authCacheKey', ttl: 3600 },
        };

        @Contract(options)
        class AuthClass {}

        assert.strictEqual(
            Reflect.getMetadata(CONTROLLER_NAME_METADATA, AuthClass),
            'AuthContract',
        );
        assert.strictEqual(
            Reflect.getMetadata(PROTO_PATH_METADATA, AuthClass),
            'auth.proto',
        );
        assert.strictEqual(
            Reflect.getMetadata(PROTO_PACKAGE_METADATA, AuthClass),
            'auth.package',
        );
        assert.strictEqual(Reflect.getMetadata(AUTH_METADATA, AuthClass), true);
        assert.deepStrictEqual(
            Reflect.getMetadata(CONTROLLER_CACHE, AuthClass),
            { key: 'authCacheKey', ttl: 3600 },
        );
    });

    it('should handle contract imports and custom paths', function () {
        const options = {
            controllerName: 'ImportContract',
            protoPath: 'import.proto',
            imports: ['import1', 'import2'],
            controllerCustomPath: 'custom/import/path',
        };

        @Contract(options)
        class ImportClass {}

        assert.strictEqual(
            Reflect.getMetadata(CONTROLLER_NAME_METADATA, ImportClass),
            'ImportContract',
        );
        assert.deepStrictEqual(
            Reflect.getMetadata(CONTROLLER_IMPORTS, ImportClass),
            ['import1', 'import2'],
        );
        assert.strictEqual(
            Reflect.getMetadata(CONTROLLER_CUSTOM_PATH_METADATA, ImportClass),
            'custom/import/path',
        );
    });
});

describe('ContractField Decorator Additional Tests', function () {
    it('should apply transform and validation options correctly', function () {
        const options = {
            protoType: 'string',
            transform: (value: string) => value.toUpperCase(),
            validations: [{ type: 'required', message: 'Field is required' }],
        };

        @Contract()
        class TransformClass {
            @ContractField(options)
            public name: string;
        }

        const contract: any = new TransformClass();
        const target = contract.constructor || contract;
        const prototype = target.prototype || contract.prototype;

        const fieldMetadata = Reflect.getMetadata(
            FIELD_METADATA,
            prototype,
        ).find((field: any) => field.propertyKey === 'name');

        assert.strictEqual(fieldMetadata.protoType, 'string');
        assert.strictEqual(typeof fieldMetadata.transform, 'function');
        assert.deepStrictEqual(fieldMetadata.validations, [
            { type: 'required', message: 'Field is required' },
        ]);
    });

    it('should apply nullable and exclude options', function () {
        const options1 = { protoType: 'string', nullable: true };
        const options2 = { protoType: 'int32', exclude: true };

        @Contract()
        class NullableExcludeClass {
            @ContractField(options1)
            public optionalField: string;

            @ContractField(options2)
            public excludedField: number;
        }

        const contract: any = new NullableExcludeClass();
        const target = contract.constructor || contract;
        const prototype = target.prototype || contract.prototype;

        const field1Metadata = Reflect.getMetadata(
            FIELD_METADATA,
            prototype,
        ).find((field: any) => field.propertyKey === 'optionalField');
        const field2Metadata = Reflect.getMetadata(
            FIELD_METADATA,
            prototype,
        ).find((field: any) => field.propertyKey === 'excludedField');

        assert.strictEqual(field1Metadata.protoType, 'string');
        assert.strictEqual(field1Metadata.nullable, true);

        assert.strictEqual(field2Metadata.protoType, 'int32');
        assert.strictEqual(field2Metadata.exclude, true);
    });

    it('should handle toClassOnly option correctly', function () {
        const options = { protoType: 'string', toClassOnly: true };

        @Contract()
        class ClassOnlyFieldClass {
            @ContractField(options)
            public classOnlyField: string;
        }

        const contract: any = new ClassOnlyFieldClass();
        const target = contract.constructor || contract;
        const prototype = target.prototype || contract.prototype;

        const fieldMetadata = Reflect.getMetadata(
            FIELD_METADATA,
            prototype,
        ).find((field: any) => field.propertyKey === 'classOnlyField');

        assert.strictEqual(fieldMetadata.protoType, 'string');
        assert.strictEqual(fieldMetadata.toClassOnly, true);
    });
});
