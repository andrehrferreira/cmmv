import { ViewRegistry } from './view.registry';

export * from './lib/cmmv.renderview';
export * from './lib/cmmv.template';
export * from './lib/cmmv.directives';
export * from './lib/cmmv.eval';
export * from './lib/cmmv.utils';

export * from './view.config';
export * from './view.transpile';
export * from './vue.transpile';
export * from './view.registry';
export * from './view.module';

(async _ => {
    await ViewRegistry.load();
})();
