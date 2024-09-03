import { strict as assert } from 'assert';
import { ControllerRegistry } from '../../utils/controller-registry.utils';

class TestController {
    testMethod() {}
}

describe('ControllerRegistry', function () {
    beforeEach(function () {
        ControllerRegistry.clear();
    });

    it('should register a controller with the given prefix', function () {
        ControllerRegistry.registerController(TestController, '/test');
        const controllers = ControllerRegistry.getControllers();

        assert.strictEqual(controllers.length, 1);
        assert.strictEqual(controllers[0][1].prefix, '/test');
    });

    it('should register a route for the controller', function () {
        ControllerRegistry.registerController(TestController, '/test');
        ControllerRegistry.registerRoute(TestController.prototype, 'get', '/path', 'testMethod');

        const routes = ControllerRegistry.getRoutes(TestController);

        assert.strictEqual(routes.length, 1);
        assert.strictEqual(routes[0].method, 'get');
        assert.strictEqual(routes[0].path, '/path');
        assert.strictEqual(routes[0].handlerName, 'testMethod');
    });

    it('should update the method and path if the route already exists', function () {
        ControllerRegistry.registerController(TestController, '/test');
        ControllerRegistry.registerRoute(TestController.prototype, 'get', '/path', 'testMethod');
        ControllerRegistry.registerRoute(TestController.prototype, 'post', '/newpath', 'testMethod');

        const routes = ControllerRegistry.getRoutes(TestController);

        assert.strictEqual(routes.length, 1);
        assert.strictEqual(routes[0].method, 'post');
        assert.strictEqual(routes[0].path, '/newpath');
    });

    it('should register a parameter for a route handler', function () {
        ControllerRegistry.registerController(TestController, '/test');
        ControllerRegistry.registerRoute(TestController.prototype, 'get', '/path', 'testMethod');
        ControllerRegistry.registerParam(TestController.prototype, 'testMethod', 'param', 0, 'id');

        const params = ControllerRegistry.getParams(TestController.prototype, 'testMethod');

        assert.strictEqual(params.length, 1);
        assert.strictEqual(params[0].paramType, 'param');
        assert.strictEqual(params[0].index, 0);
        assert.strictEqual(params[0].paramName, 'id');
    });

    it('should return an empty array if no routes are registered for a controller', function () {
        const routes = ControllerRegistry.getRoutes(TestController);
        assert.strictEqual(routes.length, 0);
    });

    it('should return an empty array if no params are registered for a route handler', function () {
        const params = ControllerRegistry.getParams(TestController.prototype, 'nonExistentMethod');
        assert.strictEqual(params.length, 0);
    });

    it('should clear all registered controllers and routes', function () {
        ControllerRegistry.registerController(TestController, '/test');
        ControllerRegistry.registerRoute(TestController.prototype, 'get', '/path', 'testMethod');

        ControllerRegistry.clear();
        const controllers = ControllerRegistry.getControllers();

        assert.strictEqual(controllers.length, 0);
    });
});
