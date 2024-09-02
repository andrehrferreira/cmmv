import { ServiceRegistry } from '../utils/service-registry.util';

export function Service(name: string = ''): ClassDecorator {
    return (target: object) => {
        Reflect.defineMetadata('service_name', name, target);
        ServiceRegistry.registerService(target, name);
    };
}