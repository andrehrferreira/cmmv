import { ViewRegistry } from './registries/view.registry';

export * from './lib/cmmv.renderview';
export * from './lib/cmmv.template';
export * from './lib/cmmv.directives';
export * from './lib/cmmv.eval';
export * from './lib/cmmv.utils';

export * from './transpilers';
export * from './registries/view.registry';
export * from './modules/view.module';

(async _ => {
    await ViewRegistry.load();
})();
