import { ControllerRegistry } from '../utils/controller-registry.utils';

export function Controller(prefix: string = ''): ClassDecorator {
    return (target: object) => {
        ControllerRegistry.registerController(target, prefix);
    };
}

function createMethodDecorator(method: 'get' | 'post' | 'put' | 'delete' | 'patch', path: string): MethodDecorator {
    return (target, propertyKey: string | symbol) => {
        ControllerRegistry.registerRoute(target, method, path, propertyKey as string);
    };
}

export function Get(path: string = ''): MethodDecorator {
    return createMethodDecorator('get', path);
}

export function Post(path: string = ''): MethodDecorator {
    return createMethodDecorator('post', path);
}

export function Put(path: string = ''): MethodDecorator {
    return createMethodDecorator('put', path);
}

export function Delete(path: string = ''): MethodDecorator {
    return createMethodDecorator('delete', path);
}

export function Patch(path: string = ''): MethodDecorator {
    return createMethodDecorator('patch', path);
}
