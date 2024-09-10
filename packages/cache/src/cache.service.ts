import * as cacheManager from 'cache-manager';

import {
    Application,
    Config,
    Logger,
    Scope,
    Service,
    Singleton,
    isJSON,
} from '@cmmv/core';

@Service()
export class CacheService extends Singleton {
    public logger: Logger = new Logger('CacheService');
    public manager: cacheManager.Cache<any>;

    public static async loadConfig(application: Application): Promise<void> {
        const instance = CacheService.getInstance();
        const config = Config.get('cache');

        try {
            let store = await import(config.store);

            if (config.getter) store = store[config.getter];

            instance.manager = await cacheManager.caching(store, {
                ...config,
            });

            Application.setHTTPInterceptor((id, context) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const contextCached = Scope.get(id);

                        if (contextCached) {
                            const metadata = Reflect.getMetadata(
                                'cache_metadata',
                                contextCached,
                            );

                            if (context.res) {
                                const cacheKey = metadata?.key.replace(
                                    '{id}',
                                    context.req.params.id,
                                );
                                const cacheValue =
                                    await CacheService.get(cacheKey);

                                if (cacheValue) {
                                    if (isJSON(cacheValue))
                                        context.res.json(
                                            JSON.parse(cacheValue),
                                        );
                                    else
                                        context.res
                                            .status(200)
                                            .send(cacheValue);

                                    resolve(true);
                                }
                            }

                            resolve(false);
                        } else {
                            resolve(false);
                        }
                    } catch (e) {
                        reject(e.message);
                    }
                });
            });

            Application.setHTTPAfterRender(async (id, context) => {
                try {
                    const contextCached = Scope.get(id);

                    if (contextCached) {
                        const metadata = Reflect.getMetadata(
                            'cache_metadata',
                            contextCached,
                        );

                        if (context.content && metadata && metadata?.key) {
                            const cacheKey = metadata?.key.replace(
                                '{id}',
                                context.req.params.id,
                            );
                            const ttl = metadata.options?.ttl || 300;

                            const result = await CacheService.set(
                                cacheKey,
                                typeof context.content === 'object'
                                    ? JSON.stringify(context.content)
                                    : context.content,
                                ttl,
                            );

                            console.log(cacheKey, result, ttl);
                        }
                    }
                } catch (e) {
                    return false;
                }
            });
        } catch (e) {
            instance.logger.error(e.message);
            console.log(e);
        }
    }

    public static async set(
        key: string,
        value: string,
        ttl: number = 5,
    ): Promise<boolean> {
        try {
            const instance = CacheService.getInstance();
            await instance.manager.set(key, value, ttl * 1000);
            return true;
        } catch (e) {
            return false;
        }
    }

    public static async get(key: string): Promise<any> {
        try {
            const instance = CacheService.getInstance();
            const cachedData = await instance.manager.get(key);
            return cachedData;
        } catch (e) {
            return null;
        }
    }

    public static async del(key: string): Promise<boolean> {
        try {
            const instance = CacheService.getInstance();
            await instance.manager.del(key);
            return true;
        } catch (e) {
            return null;
        }
    }
}
