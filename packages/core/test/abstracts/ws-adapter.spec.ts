import { strict as assert } from 'assert';
import { Application } from '../../lib/application';
import { AbstractWSAdapter } from '../../abstracts/ws-adapter.abstract';
import { AbstractHttpAdapter } from '../../abstracts/http-adapter.abstract';

class TestWSAdapter extends AbstractWSAdapter {
    public create(
        server: AbstractHttpAdapter,
        application: Application,
        options?: any,
    ) {
        return { server, application, options };
    }

    public bindClientConnect(server, callback: Function) {
        server.onClientConnect = callback;
        return server;
    }

    public bindCustomMessageHandler(server, callback: Function) {
        server.onMessageHandler = callback;
        return server;
    }
}

describe('AbstractWSAdapter', function () {
    let appMock;
    let httpServerMock;
    let wsAdapter;

    beforeEach(function () {
        httpServerMock = { listen: () => {} };
        appMock = {
            getUnderlyingHttpServer: () => httpServerMock,
        };
        wsAdapter = new TestWSAdapter(appMock);
    });

    it('should initialize with an HTTP server instance', function () {
        const adapterWithHttp = new TestWSAdapter(httpServerMock);
        assert.strictEqual(adapterWithHttp.httpServer, httpServerMock);
    });

    it('should correctly call the create method with server and application', function () {
        const serverMock = {};
        const applicationMock = {};
        const options = { optionKey: 'optionValue' };

        const result = wsAdapter.create(
            serverMock as AbstractHttpAdapter,
            applicationMock as Application,
            options,
        );

        assert.strictEqual(result.server, serverMock);
        assert.strictEqual(result.application, applicationMock);
        assert.strictEqual(result.options.optionKey, 'optionValue');
    });
});
