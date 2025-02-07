import { ControllerRegistry } from './controller.registry';

export function Controller(prefix: string = ''): ClassDecorator {
    return (target: object) => {
        Reflect.defineMetadata('controller_prefix', prefix, target);
        ControllerRegistry.registerController(target, prefix);
    };
}

function createMethodDecorator(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    path: string,
    cb?: Function,
): MethodDecorator {
    return (target, propertyKey: string | symbol, context?: any) => {
        ControllerRegistry.registerRoute(
            target,
            method,
            path,
            propertyKey as string,
            context.value,
            cb,
        );
    };
}

function createRouteMiddleware(middleware: any, descriptor: any) {
    const existingFields =
        Reflect.getMetadata('route_metadata', descriptor.value) || {};

    const newField = existingFields?.middleware
        ? { middleware: [...existingFields?.middleware, middleware] }
        : { middleware: [middleware] };

    Reflect.defineMetadata(
        'route_metadata',
        { ...existingFields, ...newField },
        descriptor.value,
    );
}

export function Get(path: string = '', cb?: Function): MethodDecorator {
    return createMethodDecorator('get', path, cb);
}

export function Post(path: string = '', cb?: Function): MethodDecorator {
    return createMethodDecorator('post', path, cb);
}

export function Put(path: string = '', cb?: Function): MethodDecorator {
    return createMethodDecorator('put', path, cb);
}

export function Delete(path: string = '', cb?: Function): MethodDecorator {
    return createMethodDecorator('delete', path, cb);
}

export function Patch(path: string = '', cb?: Function): MethodDecorator {
    return createMethodDecorator('patch', path, cb);
}

export function Redirect(
    url: string,
    statusCode: 301 | 302 | 307 | 308,
): MethodDecorator {
    return (target, propertyKey: string | symbol, descriptor: any) => {
        const middleware = async (request: any, response: any, next?: any) => {
            if (response?.res) {
                response.res.writeHead(statusCode, { Location: url });
                response.res.end();
            }
        };

        createRouteMiddleware(middleware, descriptor);
    };
}

export function HttpCode(statusCode: number): MethodDecorator {
    return (target, propertyKey: string | symbol, descriptor: any) => {
        const middleware = async (request: any, response: any, next?: any) => {
            response.code(statusCode);
            next();
        };

        createRouteMiddleware(middleware, descriptor);
    };
}

function createParamDecorator(paramType: string): ParameterDecorator {
    return (target, propertyKey: string | symbol, parameterIndex: number) => {
        const paramName =
            paramType.startsWith('param') ||
            paramType.startsWith('query') ||
            paramType.startsWith('header')
                ? paramType.split(':')[1]
                : paramType;
        ControllerRegistry.registerParam(
            target,
            propertyKey as string,
            paramType,
            parameterIndex,
            paramName,
        );
    };
}

export function Body(): ParameterDecorator {
    return createParamDecorator('body');
}

export function Queries(): ParameterDecorator {
    return createParamDecorator(`queries`);
}

export function Param(paramName: string): ParameterDecorator {
    return createParamDecorator(`param:${paramName}`);
}

export function Query(queryName: string): ParameterDecorator {
    return createParamDecorator(`query:${queryName}`);
}

export function Header(headerName: string): ParameterDecorator {
    return createParamDecorator(`header:${headerName}`);
}

export function Headers(): ParameterDecorator {
    return createParamDecorator(`headers`);
}

export function Request(): ParameterDecorator {
    return createParamDecorator(`request`);
}

export function Req(): ParameterDecorator {
    return createParamDecorator(`request`);
}

export function Response(): ParameterDecorator {
    return createParamDecorator(`response`);
}

export function Res(): ParameterDecorator {
    return createParamDecorator(`response`);
}

export function Next(): ParameterDecorator {
    return createParamDecorator(`next`);
}

export function Session(): ParameterDecorator {
    return createParamDecorator(`session`);
}

export function User(): ParameterDecorator {
    return createParamDecorator(`user`);
}

export function Ip(): ParameterDecorator {
    return createParamDecorator(`ip`);
}

export function HostParam(): ParameterDecorator {
    return createParamDecorator(`hosts`);
}
