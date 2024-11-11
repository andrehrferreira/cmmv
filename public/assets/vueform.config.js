import en from '/node_modules/@vueform/vueform/locales/en'
import tailwind from '/node_modules/@vueform/vueform/dist/tailwind'
import { defineConfig } from '/node_modules/@vueform/vueform'

export default defineConfig({
    theme: tailwind,
    locales: { en },
    locale: 'en',
});
