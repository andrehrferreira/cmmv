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
});
