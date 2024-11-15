import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';
import { cmmvPlugin } from '@cmmv/plugin-vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
    envDir: './',

    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes('-')
                }
            }
        }), 
        vueJsxPlugin(),
        cmmvPlugin(),
        Components({
            resolvers: [ElementPlusResolver({ ssr: true })],
            directoryAsNamespace: true
        }),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            resolvers: [ElementPlusResolver({ ssr: true })]
        })
    ],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'public')
        },
    }
});
