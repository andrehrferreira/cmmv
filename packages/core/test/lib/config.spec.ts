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

    it('should return default value if configuration key does not exist', function () {
        const defaultValue = 'defaultValue';
        assert.strictEqual(
            Config.get('nonexistent.key', defaultValue),
            defaultValue,
        );
    });

    it('should merge configurations using assign method', function () {
        const configData1 = { key1: 'value1' };
        const configData2 = { key2: 'value2', key1: 'newValue1' };

        Config.assign(configData1);
        Config.assign(configData2);

        const expectedConfig = { key1: 'newValue1', key2: 'value2' };
        assert.deepEqual(Config.getAll(), expectedConfig);
    });

    it('should clear all configurations', function () {
        const configData = { key: 'value', nested: { key: 'nestedValue' } };
        Config.assign(configData);

        assert.deepEqual(Config.getAll(), configData);

        Config.clear();
        assert.deepEqual(Config.getAll(), {});
    });

    it('should handle deeply nested keys in set, get, and delete methods', function () {
        Config.set('deep.nested.key', 'deepValue');
        assert.strictEqual(Config.get('deep.nested.key'), 'deepValue');

        Config.delete('deep.nested.key');
        assert.strictEqual(Config.get('deep.nested.key'), undefined);
    });

    it('should handle missing configuration file gracefully without throwing errors', function () {
        const nonExistentConfigPath = path.join(
            process.cwd(),
            '.nonexistent.config.js',
        );
        if (fs.existsSync(nonExistentConfigPath)) {
            fs.unlinkSync(nonExistentConfigPath);
        }

        assert.doesNotThrow(() => {
            Config.loadConfig();
        });
    });

    it('should handle assigning empty objects', function () {
        Config.assign({});
        assert.deepStrictEqual(Config.getAll(), {});

        Config.assign({ key: 'value' });
        assert.deepStrictEqual(Config.getAll(), { key: 'value' });

        Config.assign({});
        assert.deepStrictEqual(Config.getAll(), { key: 'value' });
    });
});
