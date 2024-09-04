"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const singleton_abstract_js_1 = require("../../abstracts/singleton.abstract.js");
describe('Singleton', function () {
    let MySingleton;
    before(async function () {
        MySingleton = class extends singleton_abstract_js_1.Singleton {
        };
    });
    it('should return the same instance when getInstance is called twice', function () {
        const instance1 = MySingleton.getInstance();
        const instance2 = MySingleton.getInstance();
        assert_1.strict.strictEqual(instance1, instance2);
        (0, assert_1.strict)(instance1 instanceof MySingleton);
    });
    it('should create a new instance after clearInstance is called', function () {
        const instance1 = MySingleton.getInstance();
        MySingleton.clearInstance();
        const instance2 = MySingleton.getInstance();
        assert_1.strict.notStrictEqual(instance1, instance2);
        (0, assert_1.strict)(instance2 instanceof MySingleton);
    });
});
