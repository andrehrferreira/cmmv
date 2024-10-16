import 'reflect-metadata';
import { describe, it, expect } from 'vitest';
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

describe('Contract Decorator', () => {
    it('should apply default metadata when no options are provided', () => {
        @Contract()
        class TestClass {}

        expect(Reflect.getMetadata(CONTRACT_WATERMARK, TestClass)).toBe(true);
        expect(Reflect.getMetadata(CONTROLLER_NAME_METADATA, TestClass)).toBe(
            'DefaultContract',
        );
        expect(Reflect.getMetadata(PROTO_PATH_METADATA, TestClass)).toBe(
            'contract.proto',
        );
        expect(Reflect.getMetadata(PROTO_PACKAGE_METADATA, TestClass)).toBe('');
    });

    it('should apply provided metadata options', () => {
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

        expect(Reflect.getMetadata(CONTRACT_WATERMARK, TestClass)).toBe(true);
        expect(Reflect.getMetadata(CONTROLLER_NAME_METADATA, TestClass)).toBe(
            'CustomContract',
        );
        expect(Reflect.getMetadata(PROTO_PATH_METADATA, TestClass)).toBe(
            'custom.proto',
        );
        expect(Reflect.getMetadata(PROTO_PACKAGE_METADATA, TestClass)).toBe(
            'custom.package',
        );
    });
});

describe('ContractField Decorator', () => {
    it('should apply field metadata to class properties', () => {
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

        expect(fieldMetadata.protoType).toBe('string');
        expect(fieldMetadata.protoRepeated).toBe(true);
        expect(fieldMetadata.defaultValue).toBe('default');
        expect(fieldMetadata.index).toBe(true);
        expect(fieldMetadata.unique).toBe(false);
    });

    it('should handle multiple fields on the same class', () => {
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

        expect(field1Metadata.protoType).toBe('string');
        expect(field2Metadata.protoType).toBe('int32');
        expect(field2Metadata.defaultValue).toBe(42);
    });
});

describe('Contract Decorator Additional Tests', () => {
    it('should apply auth and cache metadata when provided', () => {
        const options = {
            controllerName: 'AuthContract',
            protoPath: 'auth.proto',
            protoPackage: 'auth.package',
            auth: true,
            cache: { key: 'authCacheKey', ttl: 3600 },
        };

        @Contract(options)
        class AuthClass {}

        expect(Reflect.getMetadata(CONTROLLER_NAME_METADATA, AuthClass)).toBe(
            'AuthContract',
        );
        expect(Reflect.getMetadata(PROTO_PATH_METADATA, AuthClass)).toBe(
            'auth.proto',
        );
        expect(Reflect.getMetadata(PROTO_PACKAGE_METADATA, AuthClass)).toBe(
            'auth.package',
        );
        expect(Reflect.getMetadata(AUTH_METADATA, AuthClass)).toBe(true);
        expect(Reflect.getMetadata(CONTROLLER_CACHE, AuthClass)).toEqual({
            key: 'authCacheKey',
            ttl: 3600,
        });
    });

    it('should handle contract imports and custom paths', () => {
        const options = {
            controllerName: 'ImportContract',
            protoPath: 'import.proto',
            imports: ['import1', 'import2'],
            controllerCustomPath: 'custom/import/path',
        };

        @Contract(options)
        class ImportClass {}

        expect(Reflect.getMetadata(CONTROLLER_NAME_METADATA, ImportClass)).toBe(
            'ImportContract',
        );
        expect(Reflect.getMetadata(CONTROLLER_IMPORTS, ImportClass)).toEqual([
            'import1',
            'import2',
        ]);
        expect(
            Reflect.getMetadata(CONTROLLER_CUSTOM_PATH_METADATA, ImportClass),
        ).toBe('custom/import/path');
    });
});

describe('ContractField Decorator Additional Tests', () => {
    it('should apply transform and validation options correctly', () => {
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

        expect(fieldMetadata.protoType).toBe('string');
        expect(typeof fieldMetadata.transform).toBe('function');
        expect(fieldMetadata.validations).toEqual([
            { type: 'required', message: 'Field is required' },
        ]);
    });

    it('should apply nullable and exclude options', () => {
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

        expect(field1Metadata.protoType).toBe('string');
        expect(field1Metadata.nullable).toBe(true);

        expect(field2Metadata.protoType).toBe('int32');
        expect(field2Metadata.exclude).toBe(true);
    });

    it('should handle toClassOnly option correctly', () => {
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

        expect(fieldMetadata.protoType).toBe('string');
        expect(fieldMetadata.toClassOnly).toBe(true);
    });
});
