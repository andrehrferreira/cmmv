"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const controller_registry_utils_1 = require("../../utils/controller-registry.utils");
class TestController {
    testMethod() { }
}
describe('ControllerRegistry', function () {
    beforeEach(function () {
        controller_registry_utils_1.ControllerRegistry.clear();
    });
    it('should register a controller with the given prefix', function () {
        controller_registry_utils_1.ControllerRegistry.registerController(TestController, '/test');
        const controllers = controller_registry_utils_1.ControllerRegistry.getControllers();
        assert_1.strict.strictEqual(controllers.length, 1);
        assert_1.strict.strictEqual(controllers[0][1].prefix, '/test');
    });
    it('should register a route for the controller', function () {
        controller_registry_utils_1.ControllerRegistry.registerController(TestController, '/test');
        controller_registry_utils_1.ControllerRegistry.registerRoute(TestController.prototype, 'get', '/path', 'testMethod');
        const routes = controller_registry_utils_1.ControllerRegistry.getRoutes(TestController);
        assert_1.strict.strictEqual(routes.length, 1);
        assert_1.strict.strictEqual(routes[0].method, 'get');
        assert_1.strict.strictEqual(routes[0].path, '/path');
        assert_1.strict.strictEqual(routes[0].handlerName, 'testMethod');
    });
    it('should update the method and path if the route already exists', function () {
        controller_registry_utils_1.ControllerRegistry.registerController(TestController, '/test');
        controller_registry_utils_1.ControllerRegistry.registerRoute(TestController.prototype, 'get', '/path', 'testMethod');
        controller_registry_utils_1.ControllerRegistry.registerRoute(TestController.prototype, 'post', '/newpath', 'testMethod');
        const routes = controller_registry_utils_1.ControllerRegistry.getRoutes(TestController);
        assert_1.strict.strictEqual(routes.length, 1);
        assert_1.strict.strictEqual(routes[0].method, 'post');
        assert_1.strict.strictEqual(routes[0].path, '/newpath');
    });
    it('should register a parameter for a route handler', function () {
        controller_registry_utils_1.ControllerRegistry.registerController(TestController, '/test');
        controller_registry_utils_1.ControllerRegistry.registerRoute(TestController.prototype, 'get', '/path', 'testMethod');
        controller_registry_utils_1.ControllerRegistry.registerParam(TestController.prototype, 'testMethod', 'param', 0, 'id');
        const params = controller_registry_utils_1.ControllerRegistry.getParams(TestController.prototype, 'testMethod');
        assert_1.strict.strictEqual(params.length, 1);
        assert_1.strict.strictEqual(params[0].paramType, 'param');
        assert_1.strict.strictEqual(params[0].index, 0);
        assert_1.strict.strictEqual(params[0].paramName, 'id');
    });
    it('should return an empty array if no routes are registered for a controller', function () {
        const routes = controller_registry_utils_1.ControllerRegistry.getRoutes(TestController);
        assert_1.strict.strictEqual(routes.length, 0);
    });
    it('should return an empty array if no params are registered for a route handler', function () {
        const params = controller_registry_utils_1.ControllerRegistry.getParams(TestController.prototype, 'nonExistentMethod');
        assert_1.strict.strictEqual(params.length, 0);
    });
    it('should clear all registered controllers and routes', function () {
        controller_registry_utils_1.ControllerRegistry.registerController(TestController, '/test');
        controller_registry_utils_1.ControllerRegistry.registerRoute(TestController.prototype, 'get', '/path', 'testMethod');
        controller_registry_utils_1.ControllerRegistry.clear();
        const controllers = controller_registry_utils_1.ControllerRegistry.getControllers();
        assert_1.strict.strictEqual(controllers.length, 0);
    });
});
