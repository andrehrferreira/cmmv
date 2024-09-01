import { Logger } from "@cmmv/core";

export class ControllerRegistry {
    private static controllers = new Map<any, { prefix: string, routes: any[] }>();

    public static registerController(target: any, prefix: string) {
        if (!this.controllers.has(target)) 
            this.controllers.set(target, { prefix, routes: [] });
        else
            this.controllers.set(target, { ...this.controllers.get(target), prefix });
    }

    public static registerRoute(target: any, method: string, path: string, handlerName: string) {
        let controller = this.controllers.get(target.constructor);
        let logger = new Logger(target.constructor.name);
    
        if (!controller) {
            const prefix = Reflect.getMetadata('controller_prefix', target.constructor) || '';
            this.registerController(target.constructor, prefix);
            controller = this.controllers.get(target.constructor);
        }
    
        if (controller) {
            let route = controller.routes.find(route => route.handlerName === handlerName);
            
            if (!route) {
                logger.log(`Registering route: ${method.toUpperCase()} ${path} to ${handlerName}`);
                controller.routes.push({ method, path, handlerName, params: [] });
            } else {
                route.method = method;
                route.path = path;
            }
        } else {
            logger.error(`Failed to register controller for ${target.constructor.name}`);
        }
    }
    
    public static registerParam(target: any, handlerName: string, paramType: string, index: number, paramName?: string) {
        const controller = this.controllers.get(target.constructor);

        if (controller) {
            let route = controller.routes.find(route => route.handlerName === handlerName);
            
            if (!route) {
                route = { method: '', path: '', handlerName, params: [] };
                controller.routes.push(route);
            }
    
            route.params = route.params || [];
            route.params.push({ paramType, index, paramName });
        }
    }   

    public static getControllers() {
        return Array.from(this.controllers.entries());
    }
}

