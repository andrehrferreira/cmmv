import { strict as assert } from 'assert';
import { AbstractHttpAdapter } from '../../abstracts/http-adapter.abstract';

class Adapter extends AbstractHttpAdapter {}

describe('AbstractHttpAdapter', function () {
    let adapter;
    let instanceMock;

    beforeEach(function () {
        instanceMock = {
            use: (...args: any[]) => {
                instanceMock.use.calledWith = args;
            },
            get: (...args: any[]) => {
                instanceMock.get.calledWith = args;
            },
            post: (...args: any[]) => {
                instanceMock.post.calledWith = args;
            },
            listen: (...args: any[]) => {
                instanceMock.listen.calledWith = args;
            },
        };

        adapter = new Adapter(instanceMock);
    });

    it('should initialize application and settings in init method', async function () {
        const applicationMock = {};
        const settingsMock = { port: 3000 };

        await adapter.init(applicationMock, settingsMock);

        assert(
            adapter instanceof AbstractHttpAdapter,
            'adapter should be an instance of AbstractHttpAdapter',
        );
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

        assert(
            adapter.isJson(jsonString),
            'Should recognize a valid JSON string',
        );
        assert(
            adapter.isJson(jsonObject),
            'Should recognize a valid JSON object',
        );
        assert(
            !adapter.isJson('not a json string'),
            'Should not recognize an invalid JSON string',
        );
    });

    it('should correctly call the use method of the instance', function () {
        const middleware = () => {};

        adapter.use(middleware);

        assert.deepEqual(
            instanceMock.use.calledWith,
            [middleware],
            'use method should be called with the correct arguments',
        );
    });

    it('should correctly call the get method of the instance with path and handler', function () {
        const path = '/test';
        const handler = () => {};

        adapter.get(path, handler);

        assert.deepEqual(
            instanceMock.get.calledWith,
            [path, handler],
            'get method should be called with path and handler',
        );
    });

    it('should correctly call the post method of the instance with path and handler', function () {
        const path = '/test';
        const handler = () => {};

        adapter.post(path, handler);

        assert.deepEqual(
            instanceMock.post.calledWith,
            [path, handler],
            'post method should be called with path and handler',
        );
    });

    it('should call listen method with correct parameters', function () {
        const port = 3000;
        const hostname = 'localhost';
        const callback = () => {};

        adapter.listen(port, hostname, callback);

        assert.deepEqual(
            instanceMock.listen.calledWith,
            [port, hostname, callback],
            'listen method should be called with correct arguments',
        );
    });
});
