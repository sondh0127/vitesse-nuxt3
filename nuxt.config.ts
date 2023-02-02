import Inspector from 'vite-plugin-vue-inspector'
import DefineOptions from 'unplugin-vue-define-options/vite'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  css: [
    // SECTION anu css
    '@/assets/scss/anu.scss',
    '@/packages/preset-theme-default/scss/index.scss',
    // !SECTION
  ],
  colorMode: {
    classSuffix: '',
  },
  vite: {
    plugins: [
      Inspector({
        appendTo: 'entry.mjs',
      }),
      DefineOptions(),
    ],
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: [
          'unplugin-vue-define-options/macros-global',
        ],
      },
    },
  },
})
