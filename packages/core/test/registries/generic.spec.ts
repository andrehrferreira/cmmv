import { describe, it, expect, beforeEach } from 'vitest';
import { GenericRegistry } from '../../registries/generic.registry';

class TestController {
    async method() {}
}
const controller = new TestController();

describe('GenericRegistry', () => {
    beforeEach(() => {
        GenericRegistry.clear();
    });

    it('should register a controller with options', () => {
        GenericRegistry.registerController(TestController, { option: 'test' });
        const controllers = GenericRegistry.getControllers();

        expect(controllers.length).toBe(1);
        expect(controllers[0][0]).toBe(TestController);
        expect(controllers[0][1].options).toEqual({ option: 'test' });
    });

    it('should update options if the controller is already registered', () => {
        GenericRegistry.registerController(TestController, {
            option: 'initial',
        });
        GenericRegistry.registerController(TestController, {
            option: 'updated',
        });

        const controllers = GenericRegistry.getControllers();
        expect(controllers.length).toBe(1);
        expect(controllers[0][1].options).toEqual({ option: 'updated' });
    });

    it('should register a handler for a controller', () => {
        GenericRegistry.registerHandler(TestController, 'handleEvent');
        const handlers = GenericRegistry.getHandlers(TestController);

        expect(handlers.length).toBe(1);
        expect(handlers[0].handlerName).toBe('handleEvent');
        expect(handlers[0].params).toEqual([]);
    });

    it('should not duplicate handlers with the same name', () => {
        GenericRegistry.registerHandler(TestController, 'handleEvent');
        GenericRegistry.registerHandler(TestController, 'handleEvent');

        const handlers = GenericRegistry.getHandlers(TestController);
        expect(handlers.length).toBe(1);
    });

    it('should register parameters for a handler', () => {
        GenericRegistry.registerParam(
            TestController,
            'handleEvent',
            'string',
            0,
        );
        GenericRegistry.registerParam(
            TestController,
            'handleEvent',
            'number',
            1,
        );

        const params = GenericRegistry.getParams(TestController, 'handleEvent');

        expect(params.length).toBe(2);
        expect(params[0]).toEqual({ paramType: 'string', index: 0 });
        expect(params[1]).toEqual({ paramType: 'number', index: 1 });
    });

    it('should return an empty array for handlers of a non-existent controller', () => {
        const handlers = GenericRegistry.getHandlers(TestController);
        expect(handlers).toEqual([]);
    });

    it('should return an empty array for parameters of a non-existent handler', () => {
        GenericRegistry.registerHandler(TestController, 'handleEvent');

        const params = GenericRegistry.getParams(
            TestController,
            'nonExistentHandler',
        );
        expect(params).toEqual([]);
    });

    it('should clear all registered controllers', () => {
        GenericRegistry.registerController(TestController, { option: 'test' });
        GenericRegistry.clear();

        const controllers = GenericRegistry.getControllers();
        expect(controllers.length).toBe(0);
    });
});
