import * as fs from 'fs';
import * as path from 'path';
import { strict as assert } from 'assert';
import { Config } from '../../lib/config';

describe('Config', function () {
    beforeEach(function () {
        Config.clear();
    });

    it('should load configuration file correctly', async function () {
        const configData = { key: 'value', nested: { key: 'nestedValue' } };
        const configPath = path.join(process.cwd(), '.cmmv.test.js');

        await fs.writeFileSync(
            configPath,
            `module.exports = ${JSON.stringify(configData)};`,
        );

        Config.loadConfig();
        assert.deepEqual(Config.getAll(), configData);

        fs.unlinkSync(configPath);
    });

    it('should get a configuration value by key', function () {
        const configData = { key: 'value', nested: { key: 'nestedValue' } };
        Config.assign(configData);

        assert.strictEqual(Config.get('key'), 'value');
        assert.strictEqual(Config.get('nested.key'), 'nestedValue');
        assert.strictEqual(Config.get('nonexistent.key'), undefined);
    });

    it('should check if a configuration key exists', function () {
        const configData = { key: 'value', nested: { key: 'nestedValue' } };
        Config.assign(configData);

        assert.strictEqual(Config.has('key'), true);
        assert.strictEqual(Config.has('nested.key'), true);
        assert.strictEqual(Config.has('nonexistent.key'), false);
    });

    it('should set a configuration value by key', function () {
        Config.set('key', 'value');
        assert.strictEqual(Config.get('key'), 'value');

        Config.set('nested.key', 'nestedValue');
        assert.strictEqual(Config.get('nested.key'), 'nestedValue');
    });

    it('should delete a configuration value by key', function () {
        Config.set('key', 'value');
        assert.strictEqual(Config.get('key'), 'value');

        Config.delete('key');
        assert.strictEqual(Config.get('key'), undefined);

        Config.set('nested.key', 'nestedValue');
        assert.strictEqual(Config.get('nested.key'), 'nestedValue');

        Config.delete('nested.key');
        assert.strictEqual(Config.get('nested.key'), undefined);
    });

    it('should return all configuration values', function () {
        const configData = { key: 'value', nested: { key: 'nestedValue' } };
        Config.assign(configData);

        assert.deepEqual(Config.getAll(), configData);
    });
});
