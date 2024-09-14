import { strict as assert } from 'assert';
import 'reflect-metadata';
import { CacheRegistry } from '../registries/cache.registry';

describe('CacheRegistry', function () {
    it('should register cache handler metadata correctly', function () {
        class TestClass {}
        const context = TestClass.prototype;
        const key = 'cacheKey';
        const handlerName = 'testHandler';
        const options = { ttl: 100 };

        CacheRegistry.registerHandler(
            context,
            key,
            handlerName,
            options,
            context,
        );

        const metadata = Reflect.getMetadata('cache_metadata', context);

        assert.deepStrictEqual(metadata, {
            handler: handlerName,
            key: key,
            options: options,
        });
    });

    it('should register handler metadata without options', function () {
        class TestClass {}
        const context = TestClass.prototype;
        const key = 'cacheKey';
        const handlerName = 'testHandler';

        CacheRegistry.registerHandler(
            context,
            key,
            handlerName,
            undefined,
            context,
        );

        const metadata = Reflect.getMetadata('cache_metadata', context);

        assert.deepStrictEqual(metadata, {
            handler: handlerName,
            key: key,
            options: undefined,
        });
    });
});
