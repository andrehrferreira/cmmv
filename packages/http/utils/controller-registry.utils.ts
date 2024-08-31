export class ControllerRegistry {
    private static controllers = new Map<any, { prefix: string, routes: any[] }>();

    public static registerController(target: any, prefix: string) {
        if (!this.controllers.has(target)) {
            this.controllers.set(target, { prefix, routes: [] });
        }
    }

    public static registerRoute(target: any, method: string, path: string, handlerName: string) {
        const controller = this.controllers.get(target.constructor);
        if (controller) {
            controller.routes.push({ method, path, handlerName });
        }
    }

    public static registerParam(target: any, handlerName: string, paramType: string, index: number) {
        const controller = this.controllers.get(target.constructor);
        if (controller) {
            const route = controller.routes.find(route => route.handlerName === handlerName);
            if (route) {
                route.params = route.params || [];
                route.params.push({ paramType, index });
            }
        }
    }

    public static getControllers() {
        return Array.from(this.controllers.entries());
    }
}
