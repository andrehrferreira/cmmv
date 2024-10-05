import { strict as assert } from 'assert';
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Patch,
    Body,
    Param,
    Query,
    Header,
    Request,
    Response,
} from '../../decorators/controller.decorator';
import { ControllerRegistry } from '../../utils/controller-registry.utils';

describe('Controller Decorators', () => {
    beforeEach(() => {
        ControllerRegistry.clear();
    });

    it('should register a controller with a given prefix', () => {
        @Controller('/test')
        class TestController {}

        const controllers = ControllerRegistry.getControllers();
        assert.strictEqual(controllers.length, 1);
        assert.strictEqual(controllers[0][1].prefix, '/test');
    });

    it('should register a controller with an empty prefix by default', () => {
        @Controller()
        class TestController {}

        const controllers = ControllerRegistry.getControllers();
        assert.strictEqual(controllers.length, 1);
        assert.strictEqual(controllers[0][1].prefix, '');
    });

    it('should register a GET route', () => {
        @Controller()
        class TestController {
            @Get('/test-get')
            getTest() {}
        }

        const routes = ControllerRegistry.getRoutes(TestController);
        assert.strictEqual(routes.length, 1);
        assert.strictEqual(routes[0].method, 'get');
        assert.strictEqual(routes[0].path, '/test-get');
    });

    it('should register a POST route', () => {
        @Controller()
        class TestController {
            @Post('/test-post')
            postTest() {}
        }

        const routes = ControllerRegistry.getRoutes(TestController);
        assert.strictEqual(routes.length, 1);
        assert.strictEqual(routes[0].method, 'post');
        assert.strictEqual(routes[0].path, '/test-post');
    });

    it('should register a PUT route', () => {
        @Controller()
        class TestController {
            @Put('/test-put')
            putTest() {}
        }

        const routes = ControllerRegistry.getRoutes(TestController);
        assert.strictEqual(routes.length, 1);
        assert.strictEqual(routes[0].method, 'put');
        assert.strictEqual(routes[0].path, '/test-put');
    });

    it('should register a DELETE route', () => {
        @Controller()
        class TestController {
            @Delete('/test-delete')
            deleteTest() {}
        }

        const routes = ControllerRegistry.getRoutes(TestController);
        assert.strictEqual(routes.length, 1);
        assert.strictEqual(routes[0].method, 'delete');
        assert.strictEqual(routes[0].path, '/test-delete');
    });

    it('should register a PATCH route', () => {
        @Controller()
        class TestController {
            @Patch('/test-patch')
            patchTest() {}
        }

        const routes = ControllerRegistry.getRoutes(TestController);
        assert.strictEqual(routes.length, 1);
        assert.strictEqual(routes[0].method, 'patch');
        assert.strictEqual(routes[0].path, '/test-patch');
    });

    it('should register a method with a Body parameter', () => {
        @Controller()
        class TestController {
            test(@Body() body: any) {}
        }

        const params = ControllerRegistry.getParams(
            TestController.prototype,
            'test',
        );
        assert.strictEqual(params.length, 1);
        assert.strictEqual(params[0].paramType, 'body');
    });

    it('should register a method with a Param parameter', () => {
        @Controller()
        class TestController {
            test(@Param('id') id: string) {}
        }

        const params = ControllerRegistry.getParams(
            TestController.prototype,
            'test',
        );
        assert.strictEqual(params.length, 1);
        assert.strictEqual(params[0].paramType, 'param:id');
        assert.strictEqual(params[0].paramName, 'id');
    });

    it('should register a method with a Query parameter', () => {
        @Controller()
        class TestController {
            test(@Query('search') search: string) {}
        }

        const params = ControllerRegistry.getParams(
            TestController.prototype,
            'test',
        );
        assert.strictEqual(params.length, 1);
        assert.strictEqual(params[0].paramType, 'query:search');
        assert.strictEqual(params[0].paramName, 'search');
    });

    it('should register a method with a Header parameter', () => {
        @Controller()
        class TestController {
            test(@Header('authorization') auth: string) {}
        }

        const params = ControllerRegistry.getParams(
            TestController.prototype,
            'test',
        );
        assert.strictEqual(params.length, 1);
        assert.strictEqual(params[0].paramType, 'header:authorization');
        assert.strictEqual(params[0].paramName, 'authorization');
    });

    it('should register a method with a Request parameter', () => {
        @Controller()
        class TestController {
            test(@Request() req: any) {}
        }

        const params = ControllerRegistry.getParams(
            TestController.prototype,
            'test',
        );
        assert.strictEqual(params.length, 1);
        assert.strictEqual(params[0].paramType, 'request');
    });

    it('should register a method with a Response parameter', () => {
        @Controller()
        class TestController {
            test(@Response() res: any) {}
        }

        const params = ControllerRegistry.getParams(
            TestController.prototype,
            'test',
        );
        assert.strictEqual(params.length, 1);
        assert.strictEqual(params[0].paramType, 'response');
    });
});
