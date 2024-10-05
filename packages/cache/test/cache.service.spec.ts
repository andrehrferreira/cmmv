import { strict as assert } from 'assert';
import { CacheService } from '../services/cache.service';
import { Application, Config } from '@cmmv/core';
import * as cacheManager from 'cache-manager';
import * as sinon from 'sinon';

describe('CacheService', function () {
    let sandbox: sinon.SinonSandbox;

    beforeEach(async function () {
        sandbox = sinon.createSandbox();
        CacheService.getInstance().manager = await cacheManager.caching(
            'memory',
            { max: 100, ttl: 10 },
        );
    });

    afterEach(async function () {
        await CacheService.getInstance().manager.reset();
    });

    it('should set a cache key-value pair', async function () {
        const setSpy = sandbox.spy(CacheService.getInstance().manager, 'set');

        const result = await CacheService.set('testKey', 'testValue', 10);
        assert.strictEqual(result, true);
        assert(setSpy.calledWith('testKey', 'testValue', 10000));
    });

    it('should get a cached value by key', async function () {
        const getStub = sandbox
            .stub(CacheService.getInstance().manager, 'get')
            .resolves('testValue');
        const result = await CacheService.get('testKey');

        assert.strictEqual(result, 'testValue');
        assert(getStub.calledWith('testKey'));
    });

    it('should return null when cache key does not exist', async function () {
        const getStub = sandbox
            .stub(CacheService.getInstance().manager, 'get')
            .resolves(null);
        const result = await CacheService.get('nonExistentKey');

        assert.strictEqual(result, null);
        assert(getStub.calledWith('nonExistentKey'));
    });

    it('should delete a cache key', async function () {
        await CacheService.set('testKey', 'test');
        const result = await CacheService.del('testKey');
        assert.strictEqual(result, true);
    });

    it('should set a cache key-value pair', async function () {
        const result = await CacheService.set('testKey', 'testValue', 10);
        const cachedValue = await CacheService.get('testKey');

        assert.strictEqual(result, true);
        assert.strictEqual(cachedValue, 'testValue');
    });

    it('should get a cached value by key', async function () {
        await CacheService.set('testKey', 'testValue', 10);
        const result = await CacheService.get('testKey');

        assert.strictEqual(result, 'testValue');
    });
});
