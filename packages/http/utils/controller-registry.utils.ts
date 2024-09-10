import * as crypto from 'crypto';
import { Logger, Scope } from '@cmmv/core';

export class ControllerRegistry {
    private static controllers = new Map<
        any,
        { prefix: string; routes: any[] }
    >();

    public static registerController(
        target: any,
        prefix: string,
        context?: any,
    ) {
        if (!this.controllers.has(target))
            this.controllers.set(target, { prefix, routes: [] });
        else {
            const data = this.controllers.get(target);
            this.controllers.set(target, { ...data, prefix });

            data.routes.forEach(route => {
                if (route.context)
                    Scope.set(
                        `${route.method}::/${prefix}${route.path ? '/' + route.path : ''}`.toLocaleLowerCase(),
                        route.context,
                    );
            });
        }
    }

    public static registerRoute(
        target: any,
        method: string,
        path: string,
        handlerName: string,
        context?: any,
        cb?: Function,
    ) {
        let controller = this.controllers.get(target.constructor);
        let logger = new Logger(target.constructor.name);

        if (!controller) {
            const prefix =
                Reflect.getMetadata('controller_prefix', target.constructor) ||
                '';
            this.registerController(target.constructor, prefix, context);
            controller = this.controllers.get(target.constructor);
        }

        if (controller) {
            let route = controller.routes.find(
                route => route.handlerName === handlerName,
            );

            if (context) {
                Scope.set(
                    `${method}::/${controller.prefix}${path ? '/' + path : ''}`.toLocaleLowerCase(),
                    context,
                );
            }

            if (!route) {
                controller.routes.push({
                    method,
                    path,
                    handlerName,
                    prefix: controller.prefix,
                    params: [],
                    context,
                    cb,
                });
            } else {
                route.method = method;
                route.path = path;
                route.prefix = controller.prefix;
                route.context = context;
                route.cb = cb;
            }
        }
    }

    public static registerParam(
        target: any,
        handlerName: string,
        paramType: string,
        index: number,
        paramName?: string,
    ) {
        let controller = this.controllers.get(target.constructor);

        if (!controller) {
            const prefix =
                Reflect.getMetadata('controller_prefix', target.constructor) ||
                '';
            this.registerController(target.constructor, prefix);
            controller = this.controllers.get(target.constructor);
        }

        if (controller) {
            let route = controller.routes.find(
                route => route.handlerName === handlerName,
            );

            if (!route) {
                route = {
                    method: '',
                    path: '',
                    handlerName,
                    params: [],
                    cb: null,
                };
                controller.routes.push(route);
            }

            route.params = route.params || [];
            route.params.push({ paramType, index, paramName });
        } else {
            console.log(`${target.constructor.name} not found`);
        }
    }

    public static getControllers() {
        return Array.from(this.controllers.entries());
    }

    public static getRoutes(target: any): any[] {
        const controller = this.controllers.get(target);
        return controller ? controller.routes : [];
    }

    public static getParams(target: any, handlerName: string): any[] {
        const controller = this.controllers.get(target.constructor);

        if (!controller) return [];

        const route = controller.routes.find(
            route => route.handlerName === handlerName,
        );
        return route ? route.params : [];
    }

    public static clear() {
        ControllerRegistry.controllers = new Map<
            any,
            { prefix: string; routes: any[] }
        >();
    }
}
