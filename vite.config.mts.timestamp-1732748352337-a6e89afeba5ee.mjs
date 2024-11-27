// vite.config.mts
import path from "node:path";
import { defineConfig } from "file:///mnt/f/Node/cmmv/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.0_sass@1.81.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import vue from "file:///mnt/f/Node/cmmv/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vite@5.4.11_@types+node@22.10.0_sass@1.81.0_terser@5.36.0__vue@3.5.13_typescript@5.7.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsxPlugin from "file:///mnt/f/Node/cmmv/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.1.1_vite@5.4.11_@types+node@22.10.0_sass@1.81.0_terser@5.36.0__vue@3.5.13_typescript@5.7.2_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { cmmvPlugin } from "file:///mnt/f/Node/cmmv/node_modules/.pnpm/@cmmv+plugin-vite@0.0.4/node_modules/@cmmv/plugin-vite/dist/index.mjs";
import { ElementPlusResolver } from "file:///mnt/f/Node/cmmv/node_modules/.pnpm/unplugin-vue-components@0.27.5_@babel+parser@7.26.2_rollup@4.27.4_vue@3.5.13_typescript@5.7.2_/node_modules/unplugin-vue-components/dist/resolvers.js";
import Components from "file:///mnt/f/Node/cmmv/node_modules/.pnpm/unplugin-vue-components@0.27.5_@babel+parser@7.26.2_rollup@4.27.4_vue@3.5.13_typescript@5.7.2_/node_modules/unplugin-vue-components/dist/vite.js";
import AutoImport from "file:///mnt/f/Node/cmmv/node_modules/.pnpm/unplugin-auto-import@0.18.6_rollup@4.27.4/node_modules/unplugin-auto-import/dist/vite.js";
var __vite_injected_original_dirname = "/mnt/f/Node/cmmv";
var vite_config_default = defineConfig({
  envDir: "./",
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("-")
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
      imports: ["vue", "vue-router", "pinia"],
      resolvers: [ElementPlusResolver({ ssr: true })]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "public")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL21udC9mL05vZGUvY21tdlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL21udC9mL05vZGUvY21tdi92aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL21udC9mL05vZGUvY21tdi92aXRlLmNvbmZpZy5tdHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgdnVlSnN4UGx1Z2luIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xuaW1wb3J0IHsgY21tdlBsdWdpbiB9IGZyb20gJ0BjbW12L3BsdWdpbi12aXRlJztcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBlbnZEaXI6ICcuLycsXG5cbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHZ1ZSh7XG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBpc0N1c3RvbUVsZW1lbnQ6IHRhZyA9PiB0YWcuaW5jbHVkZXMoJy0nKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICAgIHZ1ZUpzeFBsdWdpbigpLFxuICAgICAgICBjbW12UGx1Z2luKCksXG4gICAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcih7IHNzcjogdHJ1ZSB9KV0sXG4gICAgICAgICAgICBkaXJlY3RvcnlBc05hbWVzcGFjZTogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICdwaW5pYSddLFxuICAgICAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcih7IHNzcjogdHJ1ZSB9KV0sXG4gICAgICAgIH0pLFxuICAgIF0sXG5cbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMnKSxcbiAgICAgICAgfSxcbiAgICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9PLE9BQU8sVUFBVTtBQUNyUCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxrQkFBa0I7QUFDekIsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUywyQkFBMkI7QUFDcEMsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFQdkIsSUFBTSxtQ0FBbUM7QUFTekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsUUFBUTtBQUFBLEVBRVIsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ04saUJBQWlCO0FBQUEsVUFDYixpQkFBaUIsU0FBTyxJQUFJLFNBQVMsR0FBRztBQUFBLFFBQzVDO0FBQUEsTUFDSjtBQUFBLElBQ0osQ0FBQztBQUFBLElBQ0QsYUFBYTtBQUFBLElBQ2IsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBLE1BQ1AsV0FBVyxDQUFDLG9CQUFvQixFQUFFLEtBQUssS0FBSyxDQUFDLENBQUM7QUFBQSxNQUM5QyxzQkFBc0I7QUFBQSxJQUMxQixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDUCxTQUFTLENBQUMsT0FBTyxjQUFjLE9BQU87QUFBQSxNQUN0QyxXQUFXLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQztBQUFBLElBQ2xELENBQUM7QUFBQSxFQUNMO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxRQUFRO0FBQUEsSUFDekM7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
