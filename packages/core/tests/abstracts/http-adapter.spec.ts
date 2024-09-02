import { strict as assert } from 'assert';
import { AbstractHttpAdapter } from '../../abstracts/http-adapter.abstract';

class Adapter extends AbstractHttpAdapter{}

describe('AbstractHttpAdapter', function () {
    let adapter;
    let instanceMock;

    beforeEach(function () {
        instanceMock = {
            use: () => {},
            get: () => {},
            post: () => {},
            head: () => {},
            delete: () => {},
            put: () => {},
            patch: () => {},
            all: () => {},
            search: () => {},
            options: () => {},
            listen: () => {},
        };

        adapter = new Adapter();
    });

    it('should initialize application and settings in init method', async function () {
        assert(adapter instanceof AbstractHttpAdapter, 'adapter should be an instance of AbstractHttpAdapter');
    });

    it('should correctly set and get the HTTP server instance', function () {
        const serverMock = {};
        adapter.setHttpServer(serverMock);
        assert.strictEqual(adapter.getHttpServer(), serverMock);
    });

    it('should correctly set and get the instance', function () {
        const newInstanceMock = {};
        adapter.setInstance(newInstanceMock);
        assert.strictEqual(adapter.getInstance(), newInstanceMock);
    });

    it('should correctly identify JSON objects', function () {
        const jsonString = '{"key":"value"}';
        const jsonObject = { key: 'value' };

        assert(adapter.isJson(jsonString), 'Should recognize a valid JSON string');
        assert(adapter.isJson(jsonObject), 'Should recognize a valid JSON object');
        assert(!adapter.isJson('not a json string'), 'Should not recognize an invalid JSON string');
    });
});
