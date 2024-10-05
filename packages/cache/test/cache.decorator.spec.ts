import { strict as assert } from 'assert';
import { CacheRegistry } from '../registries/cache.registry';
import { Cache } from '../decorators/cache.decorator';
import 'reflect-metadata';

describe('Cache Decorator', function () {
    it('should register a cache handler with the correct key and options', function () {
        class TestClass {
            @Cache('testKey', { ttl: 300, compress: true })
            public testMethod() {
                return 'test';
            }
        }

        const instance = new TestClass();
        const metadata = Reflect.getMetadata(
            'cache_metadata',
            instance.testMethod,
        );

        assert.deepStrictEqual(metadata, {
            handler: 'testMethod',
            key: 'testKey',
            options: { ttl: 300, compress: true },
        });
    });

    it('should register a cache handler without options', function () {
        class TestClass {
            @Cache('testKey')
            public testMethod() {
                return 'test';
            }
        }

        const instance = new TestClass();
        const metadata = Reflect.getMetadata(
            'cache_metadata',
            instance.testMethod,
        );

        assert.deepStrictEqual(metadata, {
            handler: 'testMethod',
            key: 'testKey',
            options: undefined,
        });
    });

    it('should register handler for a method without crashing', function () {
        class TestClass {
            @Cache('simpleKey')
            public simpleMethod() {
                return 'simple';
            }
        }

        const instance = new TestClass();
        const metadata = Reflect.getMetadata(
            'cache_metadata',
            instance.simpleMethod,
        );

        assert.strictEqual(metadata.key, 'simpleKey');
        assert.strictEqual(metadata.handler, 'simpleMethod');
    });

    it('should call the cached method correctly', function () {
        class TestClass {
            @Cache('methodKey', { ttl: 500 })
            public cachedMethod(a: number, b: number) {
                return a + b;
            }
        }

        const instance = new TestClass();
        const result = instance.cachedMethod(2, 3);

        assert.strictEqual(result, 5);
    });

    it('should handle multiple methods with different cache keys', function () {
        class TestClass {
            @Cache('keyOne', { ttl: 300 })
            public methodOne() {
                return 'one';
            }

            @Cache('keyTwo', { ttl: 600 })
            public methodTwo() {
                return 'two';
            }
        }

        const instance = new TestClass();
        const methodOneMetadata = Reflect.getMetadata(
            'cache_metadata',
            instance.methodOne,
        );
        const methodTwoMetadata = Reflect.getMetadata(
            'cache_metadata',
            instance.methodTwo,
        );

        assert.strictEqual(methodOneMetadata.key, 'keyOne');
        assert.strictEqual(methodTwoMetadata.key, 'keyTwo');
        assert.strictEqual(methodOneMetadata.options.ttl, 300);
        assert.strictEqual(methodTwoMetadata.options.ttl, 600);
    });

    it('should support cache options with compression enabled', function () {
        class TestClass {
            @Cache('compressKey', { compress: true })
            public compressedMethod() {
                return 'compressed result';
            }
        }

        const instance = new TestClass();
        const metadata = Reflect.getMetadata(
            'cache_metadata',
            instance.compressedMethod,
        );

        assert.strictEqual(metadata.key, 'compressKey');
        assert.strictEqual(metadata.options.compress, true);
    });

    it('should apply cache metadata even with a complex cache key structure', function () {
        class TestClass {
            @Cache('complex:key:structure', { ttl: 400 })
            public complexKeyMethod() {
                return 'complex key';
            }
        }

        const instance = new TestClass();
        const metadata = Reflect.getMetadata(
            'cache_metadata',
            instance.complexKeyMethod,
        );

        assert.strictEqual(metadata.key, 'complex:key:structure');
        assert.strictEqual(metadata.options.ttl, 400);
    });
});
