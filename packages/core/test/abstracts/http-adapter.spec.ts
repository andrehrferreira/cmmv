import { describe, it, beforeEach, expect } from 'vitest';
import { AbstractHttpAdapter } from '../../abstracts/http-adapter.abstract';

class Adapter extends AbstractHttpAdapter {}

describe('AbstractHttpAdapter', () => {
    let adapter;
    let instanceMock;

    beforeEach(() => {
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

    it('should initialize application and settings in init method', async () => {
        const applicationMock = {};
        const settingsMock = { port: 3000 };

        await adapter.init(applicationMock, settingsMock);

        expect(adapter).toBeInstanceOf(AbstractHttpAdapter);
    });

    it('should correctly set and get the HTTP server instance', () => {
        const serverMock = {};
        adapter.setHttpServer(serverMock);
        expect(adapter.getHttpServer()).toBe(serverMock);
    });

    it('should correctly set and get the instance', () => {
        const newInstanceMock = {};
        adapter.setInstance(newInstanceMock);
        expect(adapter.getInstance()).toBe(newInstanceMock);
    });

    it('should correctly identify JSON objects', () => {
        const jsonString = '{"key":"value"}';
        const jsonObject = { key: 'value' };

        expect(adapter.isJson(jsonString)).toBe(true);
        expect(adapter.isJson(jsonObject)).toBe(true);
        expect(adapter.isJson('not a json string')).toBe(false);
    });

    it('should correctly call the use method of the instance', () => {
        const middleware = () => {};

        adapter.use(middleware);

        expect(instanceMock.use.calledWith).toEqual([middleware]);
    });

    it('should correctly call the get method of the instance with path and handler', () => {
        const path = '/test';
        const handler = () => {};

        adapter.get(path, handler);

        expect(instanceMock.get.calledWith).toEqual([path, handler]);
    });

    it('should correctly call the post method of the instance with path and handler', () => {
        const path = '/test';
        const handler = () => {};

        adapter.post(path, handler);

        expect(instanceMock.post.calledWith).toEqual([path, handler]);
    });

    it('should call listen method with correct parameters', () => {
        const port = 3000;
        const hostname = 'localhost';
        const callback = () => {};

        adapter.listen(port, hostname, callback);

        expect(instanceMock.listen.calledWith).toEqual([
            port,
            hostname,
            callback,
        ]);
    });
});
