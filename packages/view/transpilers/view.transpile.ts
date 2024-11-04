import * as fs from 'fs';
import * as path from 'path';
import * as UglifyJS from 'uglify-js';

import { Config, ITranspile, Logger } from '@cmmv/core';

export class ViewTranspile implements ITranspile {
    private logger: Logger = new Logger('ViewTranspile');

    run(): void {
        let useVue3 = Config.get<boolean>('view.vue3', false);

        if (useVue3) {
            const outputFileReactivity = path.resolve(
                'public/core/0-reactivity.min.js',
            );
            const outputFileVue3 = path.resolve('public/core/0-vue3.min.js');

            if (fs.existsSync(outputFileReactivity))
                fs.unlinkSync(outputFileReactivity);

            const rootDir = process.cwd();
            const devFile = path.resolve(
                __dirname,
                '../node_modules/vue/dist/vue.global.prod.js',
            );
            const prodFile = path.resolve(
                rootDir,
                './node_modules/vue/dist/vue.global.prod.js',
            );

            if (!fs.existsSync(path.resolve('public/core')))
                fs.mkdirSync(path.resolve('public/core'), { recursive: true });

            if (fs.existsSync(devFile)) {
                const vueContent = fs.readFileSync(devFile, 'utf-8');
                fs.writeFileSync(outputFileVue3, vueContent, 'utf8');
            } else if (fs.existsSync(prodFile)) {
                const vueContent = fs.readFileSync(prodFile, 'utf-8');
                fs.writeFileSync(outputFileVue3, vueContent, 'utf8');
            }
        } else {
            const outputFileVue3 = path.resolve('public/core/0-vue3.min.js');

            if (fs.existsSync(outputFileVue3)) fs.unlinkSync(outputFileVue3);

            // Reactivity
            const rootDir = process.cwd();
            const devFile = path.resolve(
                __dirname,
                '../node_modules/@cmmv/reactivity/dist/reactivity.iife.js',
            );
            const prodFile = path.resolve(
                rootDir,
                './node_modules/@cmmv/reactivity/dist/reactivity.iife.js',
            );

            if (!fs.existsSync(path.resolve('public/core')))
                fs.mkdirSync(path.resolve('public/core'), { recursive: true });

            if (fs.existsSync(devFile)) {
                const reactivity = fs.readFileSync(devFile, 'utf-8');
                const outputFileReactivity = path.resolve(
                    'public/core/0-reactivity.min.js',
                );
                const minifiedJsReactivity = UglifyJS.minify(reactivity).code;
                fs.writeFileSync(
                    outputFileReactivity,
                    minifiedJsReactivity,
                    'utf8',
                );
            } else if (fs.existsSync(prodFile)) {
                const reactivity = fs.readFileSync(prodFile, 'utf-8');
                const outputFileReactivity = path.resolve(
                    'public/core/0-reactivity.min.js',
                );
                const minifiedJsReactivity = UglifyJS.minify(reactivity).code;
                fs.writeFileSync(
                    outputFileReactivity,
                    minifiedJsReactivity,
                    'utf8',
                );
            }
        }

        // Frontend Controller
        const content = fs.readFileSync(
            path.resolve(__dirname, '../lib/cmmv.frontend.cjs'),
            'utf-8',
        );
        const outputFile = path.resolve('public/core/1-cmmv.min.js');
        const minifiedJsContent = UglifyJS.minify(content).code;
        fs.writeFileSync(outputFile, minifiedJsContent, 'utf8');
    }
}
