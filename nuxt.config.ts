import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxt/icon',
    '@therealironduck/ducktory',
  ],
  ssr: false,
  components: [{
    path: '~/components/',
    global: true,
  }],
  devtools: { enabled: true },
  app: { baseURL: '/LD57' },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-04-06',
  nitro: {
    preset: 'bun',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './assets/custom-icons',
      },
    ],
  },
})
