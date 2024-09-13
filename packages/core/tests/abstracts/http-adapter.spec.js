"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const http_adapter_abstract_1 = require("../../abstracts/http-adapter.abstract");
class Adapter extends http_adapter_abstract_1.AbstractHttpAdapter {
}
describe('AbstractHttpAdapter', function () {
    let adapter;
    let instanceMock;
    beforeEach(function () {
        instanceMock = {
            use: () => { },
            get: () => { },
            post: () => { },
            head: () => { },
            delete: () => { },
            put: () => { },
            patch: () => { },
            all: () => { },
            search: () => { },
            options: () => { },
            listen: () => { },
        };
        adapter = new Adapter();
    });
    it('should initialize application and settings in init method', async function () {
        (0, assert_1.strict)(adapter instanceof http_adapter_abstract_1.AbstractHttpAdapter, 'adapter should be an instance of AbstractHttpAdapter');
    });
    it('should correctly set and get the HTTP server instance', function () {
        const serverMock = {};
        adapter.setHttpServer(serverMock);
        assert_1.strict.strictEqual(adapter.getHttpServer(), serverMock);
    });
    it('should correctly set and get the instance', function () {
        const newInstanceMock = {};
        adapter.setInstance(newInstanceMock);
        assert_1.strict.strictEqual(adapter.getInstance(), newInstanceMock);
    });
    it('should correctly identify JSON objects', function () {
        const jsonString = '{"key":"value"}';
        const jsonObject = { key: 'value' };
        (0, assert_1.strict)(adapter.isJson(jsonString), 'Should recognize a valid JSON string');
        (0, assert_1.strict)(adapter.isJson(jsonObject), 'Should recognize a valid JSON object');
        (0, assert_1.strict)(!adapter.isJson('not a json string'), 'Should not recognize an invalid JSON string');
    });
});
