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
    CONTROLLER_VIEWFORM,
    CONTROLLER_VIEWPAGE,
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

    describe('Contract Decorator with ViewForm and ViewPage', () => {
        it('should apply viewForm and viewPage metadata when provided', () => {
            class MockViewForm {}
            class MockViewPage {}

            const options = {
                controllerName: 'ViewContract',
                protoPath: 'view.proto',
                viewForm: MockViewForm,
                viewPage: MockViewPage,
            };

            @Contract(options)
            class ViewClass {}

            expect(
                Reflect.getMetadata(CONTROLLER_NAME_METADATA, ViewClass),
            ).toBe('ViewContract');
            expect(Reflect.getMetadata(PROTO_PATH_METADATA, ViewClass)).toBe(
                'view.proto',
            );
            expect(Reflect.getMetadata(CONTROLLER_VIEWFORM, ViewClass)).toBe(
                MockViewForm,
            );
            expect(Reflect.getMetadata(CONTROLLER_VIEWPAGE, ViewClass)).toBe(
                MockViewPage,
            );
        });

        it('should apply default metadata when viewForm and viewPage are not provided', () => {
            @Contract()
            class DefaultViewClass {}

            expect(
                Reflect.getMetadata(CONTROLLER_VIEWFORM, DefaultViewClass),
            ).toBe(null);
            expect(
                Reflect.getMetadata(CONTROLLER_VIEWPAGE, DefaultViewClass),
            ).toBe(null);
        });
    });

    describe('Contract Decorator Extended Tests for ViewForm and ViewPage', () => {
        it('should allow dynamic assignment of viewForm and viewPage', () => {
            class DynamicViewForm {}
            class DynamicViewPage {}

            const options = {
                controllerName: 'DynamicViewContract',
                protoPath: 'dynamic.proto',
                viewForm: DynamicViewForm,
                viewPage: DynamicViewPage,
            };

            @Contract(options)
            class DynamicViewClass {}

            expect(
                Reflect.getMetadata(CONTROLLER_VIEWFORM, DynamicViewClass),
            ).toBe(DynamicViewForm);
            expect(
                Reflect.getMetadata(CONTROLLER_VIEWPAGE, DynamicViewClass),
            ).toBe(DynamicViewPage);
        });

        it('should handle null values for viewForm and viewPage', () => {
            const options = {
                controllerName: 'NullViewContract',
                protoPath: 'nullview.proto',
                viewForm: null,
                viewPage: null,
            };

            @Contract(options)
            class NullViewClass {}

            expect(
                Reflect.getMetadata(CONTROLLER_VIEWFORM, NullViewClass),
            ).toBe(null);
            expect(
                Reflect.getMetadata(CONTROLLER_VIEWPAGE, NullViewClass),
            ).toBe(null);
        });

        it('should work with custom metadata alongside viewForm and viewPage', () => {
            class CustomViewForm {}
            class CustomViewPage {}

            const options = {
                controllerName: 'CustomViewContract',
                protoPath: 'customview.proto',
                viewForm: CustomViewForm,
                viewPage: CustomViewPage,
                imports: ['import1', 'import2'],
                cache: { key: 'customCache', ttl: 600 },
            };

            @Contract(options)
            class CustomViewClass {}

            expect(
                Reflect.getMetadata(CONTROLLER_NAME_METADATA, CustomViewClass),
            ).toBe('CustomViewContract');
            expect(
                Reflect.getMetadata(CONTROLLER_VIEWFORM, CustomViewClass),
            ).toBe(CustomViewForm);
            expect(
                Reflect.getMetadata(CONTROLLER_VIEWPAGE, CustomViewClass),
            ).toBe(CustomViewPage);
            expect(
                Reflect.getMetadata(CONTROLLER_IMPORTS, CustomViewClass),
            ).toEqual(['import1', 'import2']);
            expect(
                Reflect.getMetadata(CONTROLLER_CACHE, CustomViewClass),
            ).toEqual({ key: 'customCache', ttl: 600 });
        });

        it('should override default viewForm and viewPage with provided values', () => {
            class OverriddenViewForm {}
            class OverriddenViewPage {}

            const options = {
                viewForm: OverriddenViewForm,
                viewPage: OverriddenViewPage,
            };

            @Contract(options)
            class OverriddenViewClass {}

            expect(
                Reflect.getMetadata(CONTROLLER_VIEWFORM, OverriddenViewClass),
            ).toBe(OverriddenViewForm);
            expect(
                Reflect.getMetadata(CONTROLLER_VIEWPAGE, OverriddenViewClass),
            ).toBe(OverriddenViewPage);
        });

        it('should throw error if viewForm or viewPage are invalid types', () => {
            const invalidOptions1 = {
                viewForm: 'invalidViewForm', // Invalid type
            };

            const invalidOptions2 = {
                viewPage: 123, // Invalid type
            };

            expect(() => {
                @Contract(invalidOptions1 as any)
                class InvalidViewFormClass {}
            }).toThrowError();

            expect(() => {
                @Contract(invalidOptions2 as any)
                class InvalidViewPageClass {}
            }).toThrowError();
        });
    });
});
