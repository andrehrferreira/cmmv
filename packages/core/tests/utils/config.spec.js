"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const assert_1 = require("assert");
const config_1 = require("../../lib/config");
describe('Config', function () {
    beforeEach(function () {
        config_1.Config.clear();
    });
    it('should load configuration file correctly', async function () {
        const configData = { key: 'value', nested: { key: 'nestedValue' } };
        const configPath = path.join(process.cwd(), '.cmmv.test.js');
        await fs.writeFileSync(configPath, `module.exports = ${JSON.stringify(configData)};`);
        config_1.Config.loadConfig();
        assert_1.strict.deepEqual(config_1.Config.getAll(), configData);
        fs.unlinkSync(configPath);
    });
    it('should get a configuration value by key', function () {
        const configData = { key: 'value', nested: { key: 'nestedValue' } };
        config_1.Config.assign(configData);
        assert_1.strict.strictEqual(config_1.Config.get('key'), 'value');
        assert_1.strict.strictEqual(config_1.Config.get('nested.key'), 'nestedValue');
        assert_1.strict.strictEqual(config_1.Config.get('nonexistent.key'), undefined);
    });
    it('should check if a configuration key exists', function () {
        const configData = { key: 'value', nested: { key: 'nestedValue' } };
        config_1.Config.assign(configData);
        assert_1.strict.strictEqual(config_1.Config.has('key'), true);
        assert_1.strict.strictEqual(config_1.Config.has('nested.key'), true);
        assert_1.strict.strictEqual(config_1.Config.has('nonexistent.key'), false);
    });
    it('should set a configuration value by key', function () {
        config_1.Config.set('key', 'value');
        assert_1.strict.strictEqual(config_1.Config.get('key'), 'value');
        config_1.Config.set('nested.key', 'nestedValue');
        assert_1.strict.strictEqual(config_1.Config.get('nested.key'), 'nestedValue');
    });
    it('should delete a configuration value by key', function () {
        config_1.Config.set('key', 'value');
        assert_1.strict.strictEqual(config_1.Config.get('key'), 'value');
        config_1.Config.delete('key');
        assert_1.strict.strictEqual(config_1.Config.get('key'), undefined);
        config_1.Config.set('nested.key', 'nestedValue');
        assert_1.strict.strictEqual(config_1.Config.get('nested.key'), 'nestedValue');
        config_1.Config.delete('nested.key');
        assert_1.strict.strictEqual(config_1.Config.get('nested.key'), undefined);
    });
    it('should return all configuration values', function () {
        const configData = { key: 'value', nested: { key: 'nestedValue' } };
        config_1.Config.assign(configData);
        assert_1.strict.deepEqual(config_1.Config.getAll(), configData);
    });
});
