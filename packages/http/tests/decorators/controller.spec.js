"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = require("assert");
const controller_decorator_1 = require("../../decorators/controller.decorator");
const controller_registry_utils_1 = require("../../utils/controller-registry.utils");
describe('Controller Decorators', () => {
    beforeEach(() => {
        controller_registry_utils_1.ControllerRegistry.clear();
    });
    it('should register a controller with a given prefix', () => {
        let TestController = class TestController {
        };
        TestController = tslib_1.__decorate([
            (0, controller_decorator_1.Controller)('/test')
        ], TestController);
        const controllers = controller_registry_utils_1.ControllerRegistry.getControllers();
        assert_1.strict.strictEqual(controllers.length, 1);
        assert_1.strict.strictEqual(controllers[0][1].prefix, '/test');
    });
    it('should register a controller with an empty prefix by default', () => {
        let TestController = class TestController {
        };
        TestController = tslib_1.__decorate([
            (0, controller_decorator_1.Controller)()
        ], TestController);
        const controllers = controller_registry_utils_1.ControllerRegistry.getControllers();
        assert_1.strict.strictEqual(controllers.length, 1);
        assert_1.strict.strictEqual(controllers[0][1].prefix, '');
    });
    it('should register a GET route', () => {
        let TestController = class TestController {
            getTest() { }
        };
        tslib_1.__decorate([
            (0, controller_decorator_1.Get)('/test-get'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestController.prototype, "getTest", null);
        TestController = tslib_1.__decorate([
            (0, controller_decorator_1.Controller)()
        ], TestController);
        const routes = controller_registry_utils_1.ControllerRegistry.getRoutes(TestController);
        assert_1.strict.strictEqual(routes.length, 1);
        assert_1.strict.strictEqual(routes[0].method, 'get');
        assert_1.strict.strictEqual(routes[0].path, '/test-get');
    });
    it('should register a POST route', () => {
        let TestController = class TestController {
            postTest() { }
        };
        tslib_1.__decorate([
            (0, controller_decorator_1.Post)('/test-post'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestController.prototype, "postTest", null);
        TestController = tslib_1.__decorate([
            (0, controller_decorator_1.Controller)()
        ], TestController);
        const routes = controller_registry_utils_1.ControllerRegistry.getRoutes(TestController);
        assert_1.strict.strictEqual(routes.length, 1);
        assert_1.strict.strictEqual(routes[0].method, 'post');
        assert_1.strict.strictEqual(routes[0].path, '/test-post');
    });
    it('should register a PUT route', () => {
        let TestController = class TestController {
            putTest() { }
        };
        tslib_1.__decorate([
            (0, controller_decorator_1.Put)('/test-put'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestController.prototype, "putTest", null);
        TestController = tslib_1.__decorate([
            (0, controller_decorator_1.Controller)()
        ], TestController);
        const routes = controller_registry_utils_1.ControllerRegistry.getRoutes(TestController);
        assert_1.strict.strictEqual(routes.length, 1);
        assert_1.strict.strictEqual(routes[0].method, 'put');
        assert_1.strict.strictEqual(routes[0].path, '/test-put');
    });
    it('should register a DELETE route', () => {
        let TestController = class TestController {
            deleteTest() { }
        };
        tslib_1.__decorate([
            (0, controller_decorator_1.Delete)('/test-delete'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestController.prototype, "deleteTest", null);
        TestController = tslib_1.__decorate([
            (0, controller_decorator_1.Controller)()
        ], TestController);
        const routes = controller_registry_utils_1.ControllerRegistry.getRoutes(TestController);
        assert_1.strict.strictEqual(routes.length, 1);
        assert_1.strict.strictEqual(routes[0].method, 'delete');
        assert_1.strict.strictEqual(routes[0].path, '/test-delete');
    });
    it('should register a PATCH route', () => {
        let TestController = class TestController {
            patchTest() { }
        };
        tslib_1.__decorate([
            (0, controller_decorator_1.Patch)('/test-patch'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestController.prototype, "patchTest", null);
        TestController = tslib_1.__decorate([
            (0, controller_decorator_1.Controller)()
        ], TestController);
        const routes = controller_registry_utils_1.ControllerRegistry.getRoutes(TestController);
        assert_1.strict.strictEqual(routes.length, 1);
        assert_1.strict.strictEqual(routes[0].method, 'patch');
        assert_1.strict.strictEqual(routes[0].path, '/test-patch');
    });
    it('should register a method with a Body parameter', () => {
        let TestController = class TestController {
            test(body) { }
        };
        tslib_1.__decorate([
            tslib_1.__param(0, (0, controller_decorator_1.Body)()),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Object]),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestController.prototype, "test", null);
        TestController = tslib_1.__decorate([
            (0, controller_decorator_1.Controller)()
        ], TestController);
        const params = controller_registry_utils_1.ControllerRegistry.getParams(TestController.prototype, 'test');
        assert_1.strict.strictEqual(params.length, 1);
        assert_1.strict.strictEqual(params[0].paramType, 'body');
    });
    it('should register a method with a Param parameter', () => {
        let TestController = class TestController {
            test(id) { }
        };
        tslib_1.__decorate([
            tslib_1.__param(0, (0, controller_decorator_1.Param)('id')),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [String]),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestController.prototype, "test", null);
        TestController = tslib_1.__decorate([
            (0, controller_decorator_1.Controller)()
        ], TestController);
        const params = controller_registry_utils_1.ControllerRegistry.getParams(TestController.prototype, 'test');
        assert_1.strict.strictEqual(params.length, 1);
        assert_1.strict.strictEqual(params[0].paramType, 'param:id');
        assert_1.strict.strictEqual(params[0].paramName, 'id');
    });
    it('should register a method with a Query parameter', () => {
        let TestController = class TestController {
            test(search) { }
        };
        tslib_1.__decorate([
            tslib_1.__param(0, (0, controller_decorator_1.Query)('search')),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [String]),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestController.prototype, "test", null);
        TestController = tslib_1.__decorate([
            (0, controller_decorator_1.Controller)()
        ], TestController);
        const params = controller_registry_utils_1.ControllerRegistry.getParams(TestController.prototype, 'test');
        assert_1.strict.strictEqual(params.length, 1);
        assert_1.strict.strictEqual(params[0].paramType, 'query:search');
        assert_1.strict.strictEqual(params[0].paramName, 'search');
    });
    it('should register a method with a Header parameter', () => {
        let TestController = class TestController {
            test(auth) { }
        };
        tslib_1.__decorate([
            tslib_1.__param(0, (0, controller_decorator_1.Header)('authorization')),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [String]),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestController.prototype, "test", null);
        TestController = tslib_1.__decorate([
            (0, controller_decorator_1.Controller)()
        ], TestController);
        const params = controller_registry_utils_1.ControllerRegistry.getParams(TestController.prototype, 'test');
        assert_1.strict.strictEqual(params.length, 1);
        assert_1.strict.strictEqual(params[0].paramType, 'header:authorization');
        assert_1.strict.strictEqual(params[0].paramName, 'authorization');
    });
    it('should register a method with a Request parameter', () => {
        let TestController = class TestController {
            test(req) { }
        };
        tslib_1.__decorate([
            tslib_1.__param(0, (0, controller_decorator_1.Request)()),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Object]),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestController.prototype, "test", null);
        TestController = tslib_1.__decorate([
            (0, controller_decorator_1.Controller)()
        ], TestController);
        const params = controller_registry_utils_1.ControllerRegistry.getParams(TestController.prototype, 'test');
        assert_1.strict.strictEqual(params.length, 1);
        assert_1.strict.strictEqual(params[0].paramType, 'request');
    });
    it('should register a method with a Response parameter', () => {
        let TestController = class TestController {
            test(res) { }
        };
        tslib_1.__decorate([
            tslib_1.__param(0, (0, controller_decorator_1.Response)()),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Object]),
            tslib_1.__metadata("design:returntype", void 0)
        ], TestController.prototype, "test", null);
        TestController = tslib_1.__decorate([
            (0, controller_decorator_1.Controller)()
        ], TestController);
        const params = controller_registry_utils_1.ControllerRegistry.getParams(TestController.prototype, 'test');
        assert_1.strict.strictEqual(params.length, 1);
        assert_1.strict.strictEqual(params[0].paramType, 'response');
    });
});
