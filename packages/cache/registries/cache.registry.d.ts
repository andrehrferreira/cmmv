import { CacheOptions } from '../decorators/cache.decorator';
export declare class CacheRegistry {
    static registerHandler(target: any, key: string, handlerName: string, options?: CacheOptions, context?: any): void;
}
