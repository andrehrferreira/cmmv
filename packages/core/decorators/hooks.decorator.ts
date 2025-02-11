import { Hooks, HooksType } from '../lib/hooks';

export function Hook(event: HooksType) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;

        if (typeof originalMethod !== 'function')
            throw new Error(`@Hook can only be used on methods.`);

        Hooks.add(event, async (...args: any[]) => {
            await originalMethod.apply(target, args);
        });
    };
}
