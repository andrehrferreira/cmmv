const META_OPTIONS = Symbol('controller_options');

export class GenericRegistry<T> {
    public static controllers = new Map<
        any,
        {
            options?: any;
            handlers: any[];
        }
    >();

    public static registerController(target: any, options: any) {
        if (!this.controllers.has(target)) {
            this.controllers.set(target, {
                handlers: [],
                options,
            });
        } else {
            this.controllers.set(target, {
                ...this.controllers.get(target),
                options,
            });
        }
    }

    public static registerHandler(target: any, handlerName: string) {
        let controller = this.controllers.get(target.constructor);

        if (!controller) {
            const options =
                Reflect.getMetadata(META_OPTIONS, target.constructor) || {};
            this.registerController(target.constructor, options);
            controller = this.controllers.get(target.constructor);
        }

        if (controller) {
            const handler = controller.handlers.find(
                msg => msg.handlerName === handlerName,
            );

            if (!handler) controller.handlers.push({ handlerName, params: [] });
        }
    }

    public static registerParam(
        target: any,
        handlerName: string,
        paramType: string,
        index: number,
    ) {
        let controller = this.controllers.get(target.constructor);

        if (!controller) {
            const options =
                Reflect.getMetadata(META_OPTIONS, target.constructor) || {};
            this.registerController(target.constructor, options);
            controller = this.controllers.get(target.constructor);
        }

        if (controller) {
            let handler = controller.handlers.find(
                msg => msg.handlerName === handlerName,
            );

            if (!handler) {
                handler = { handlerName, params: [] };
                controller.handlers.push(handler);
            }

            handler.params = handler.params || [];
            handler.params.push({ paramType, index });
        }
    }

    public static getControllers() {
        return Array.from(this.controllers.entries());
    }

    public static getHandlers(target: any): any[] {
        const controller = this.controllers.get(target.constructor);
        return controller ? controller.handlers : [];
    }

    public static getParams(target: any, handlerName: string): any[] {
        const queues = this.controllers.get(target.constructor);

        if (!queues) return [];

        const handler = queues.handlers.find(
            handler => handler.handlerName === handlerName,
        );

        return handler ? handler.params : [];
    }

    public static clear() {
        this.controllers = new Map<
            any,
            {
                options?: any;
                handlers: any[];
            }
        >();
    }
}
