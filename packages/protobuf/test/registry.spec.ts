import { strict as assert } from 'assert';
import * as protobuf from 'protobufjs';
import { ProtoRegistry } from '../registries/protobuf.registry';
import * as path from 'path';
import * as fs from 'fs';
import * as sinon from 'sinon';

describe('ProtoRegistry', function () {
    let sandbox: sinon.SinonSandbox;

    beforeEach(function () {
        ProtoRegistry.getInstance().protos.clear();
        ProtoRegistry.getInstance().index.clear();
        ProtoRegistry.getInstance().contracts.clear();
        ProtoRegistry.getInstance().types.clear();
        sandbox = sinon.createSandbox();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should register a proto file correctly', async function () {
        const root = new protobuf.Root();
        const contract = 'syntax = "proto3";\nmessage TestMessage {}';

        ProtoRegistry.register('TestProto', root, contract);

        assert.strictEqual(ProtoRegistry.retrieve('TestProto'), root);
        assert.strictEqual(
            ProtoRegistry.retrieveContract('TestProto'),
            contract,
        );
    });

    it('should retrieve proto by key', function () {
        const root = new protobuf.Root();
        ProtoRegistry.getInstance().protos.set('TestProto', root);

        const result = ProtoRegistry.retrieve('TestProto');
        assert.strictEqual(result, root);
    });

    it('should return null if proto not found', function () {
        const result = ProtoRegistry.retrieve('NonExistentProto');
        assert.strictEqual(result, null);
    });

    it('should retrieve contract by key', function () {
        const contract = 'syntax = "proto3";\nmessage TestMessage {}';
        ProtoRegistry.getInstance().contracts.set('TestProto', contract);

        const result = ProtoRegistry.retrieveContract('TestProto');
        assert.strictEqual(result, contract);
    });

    it('should return null if contract not found', function () {
        const result = ProtoRegistry.retrieveContract('NonExistentProto');
        assert.strictEqual(result, null);
    });

    it('should retrieve types by key and message', function () {
        const typesMap = { TestMessage: 0 };
        ProtoRegistry.getInstance().types.set('TestProto', typesMap);

        const result = ProtoRegistry.retrieveTypes('TestProto', 'TestMessage');
        assert.strictEqual(result, 0);
    });

    it('should return null if types not found', function () {
        const result = ProtoRegistry.retrieveTypes(
            'NonExistentProto',
            'TestMessage',
        );
        assert.strictEqual(result, null);
    });

    it('should retrieve contract name by index', function () {
        ProtoRegistry.getInstance().index.set(0, 'TestProto');
        const result = ProtoRegistry.retrieveContractName(0);
        assert.strictEqual(result, 'TestProto');
    });

    it('should retrieve proto by index', function () {
        const root = new protobuf.Root();
        ProtoRegistry.getInstance().protos.set('TestProto', root);
        ProtoRegistry.getInstance().index.set(0, 'TestProto');

        const result = ProtoRegistry.retrieveByIndex(0);
        assert.strictEqual(result, root);
    });

    it('should retrieve all contracts', function () {
        const contract = 'syntax = "proto3";\nmessage TestMessage {}';
        ProtoRegistry.getInstance().contracts.set('TestProto', contract);

        const result = ProtoRegistry.retrieveAll();
        assert.deepStrictEqual(result, { TestProto: contract });
    });
});
