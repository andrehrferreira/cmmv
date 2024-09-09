import { ControllerRegistry } from '../utils/controller-registry.utils';

export function Controller(prefix: string = ''): ClassDecorator {
    return (target: object) => {
        Reflect.defineMetadata('controller_prefix', prefix, target);
        ControllerRegistry.registerController(target, prefix);
    };
}

function createMethodDecorator(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    path: string,
): MethodDecorator {
    return (target, propertyKey: string | symbol, context?: any) => {
        ControllerRegistry.registerRoute(
            target,
            method,
            path,
            propertyKey as string,
            context.value,
        );
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

export function Ip(): ParameterDecorator {
    return createParamDecorator(`ip`);
}

export function HostParam(): ParameterDecorator {
    return createParamDecorator(`hosts`);
}
