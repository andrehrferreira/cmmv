import { strict as assert } from 'assert';

import {
    SetMetadata,
    CustomDecorator,
} from '../../decorators/metadata.decorator';

describe('SetMetadata Decorator', () => {
    it('should set metadata on a class', () => {
        const METADATA_KEY = 'custom:metadata';
        const METADATA_VALUE = 'someValue';

        @SetMetadata(METADATA_KEY, METADATA_VALUE)
        class TestClass {}

        const metadata = Reflect.getMetadata(METADATA_KEY, TestClass);
        assert.strictEqual(metadata, METADATA_VALUE);
    });

    it('should set metadata on a method', () => {
        const METADATA_KEY = 'custom:metadata';
        const METADATA_VALUE = 'someMethodValue';

        class TestClass {
            @SetMetadata(METADATA_KEY, METADATA_VALUE)
            testMethod() {}
        }

        const methodMetadata = Reflect.getMetadata(
            METADATA_KEY,
            TestClass.prototype.testMethod,
        );
        assert.strictEqual(methodMetadata, METADATA_VALUE);
    });

    it('should set different metadata on multiple methods', () => {
        const METADATA_KEY1 = 'custom:metadata1';
        const METADATA_VALUE1 = 'methodValue1';

        const METADATA_KEY2 = 'custom:metadata2';
        const METADATA_VALUE2 = 'methodValue2';

        class TestClass {
            @SetMetadata(METADATA_KEY1, METADATA_VALUE1)
            methodOne() {}

            @SetMetadata(METADATA_KEY2, METADATA_VALUE2)
            methodTwo() {}
        }

        const methodOneMetadata = Reflect.getMetadata(
            METADATA_KEY1,
            TestClass.prototype.methodOne,
        );
        const methodTwoMetadata = Reflect.getMetadata(
            METADATA_KEY2,
            TestClass.prototype.methodTwo,
        );

        assert.strictEqual(methodOneMetadata, METADATA_VALUE1);
        assert.strictEqual(methodTwoMetadata, METADATA_VALUE2);
    });

    it('should return the decorator with KEY property', () => {
        const METADATA_KEY = 'custom:metadataKey';
        const METADATA_VALUE = 'keyValue';

        const decorator: CustomDecorator<string> = SetMetadata(
            METADATA_KEY,
            METADATA_VALUE,
        );

        assert.strictEqual(decorator.KEY, METADATA_KEY);
    });

    it('should apply the decorator on both methods and classes', () => {
        const METADATA_KEY = 'custom:universal';
        const METADATA_VALUE = 'universalValue';

        @SetMetadata(METADATA_KEY, METADATA_VALUE)
        class TestClass {
            @SetMetadata(METADATA_KEY, METADATA_VALUE)
            method() {}
        }

        const classMetadata = Reflect.getMetadata(METADATA_KEY, TestClass);
        const methodMetadata = Reflect.getMetadata(
            METADATA_KEY,
            TestClass.prototype.method,
        );

        assert.strictEqual(classMetadata, METADATA_VALUE);
        assert.strictEqual(methodMetadata, METADATA_VALUE);
    });

    it('should return descriptor when applied on a method', () => {
        const METADATA_KEY = 'custom:metadata';
        const METADATA_VALUE = 'descriptorValue';

        class TestClass {
            @SetMetadata(METADATA_KEY, METADATA_VALUE)
            method() {}
        }

        const descriptor = Object.getOwnPropertyDescriptor(
            TestClass.prototype,
            'method',
        );

        assert.notStrictEqual(descriptor, undefined);
        assert.strictEqual(typeof descriptor!.value, 'function');
    });
});
