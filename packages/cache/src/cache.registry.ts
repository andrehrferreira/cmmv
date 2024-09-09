import { CacheOptions } from './cache.decorators';

export class CacheRegistry {
    public static registerHandler(
        target: any,
        key: string,
        handlerName: string,
        options?: CacheOptions,
        context?: any,
    ) {
        Reflect.defineMetadata(
            'cache_metadata',
            { handler: handlerName, key, options },
            context,
        );
    }
}
