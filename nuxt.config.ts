export default defineNuxtConfig({
  compatibilityDate: '2026-03-22',
  devtools: { enabled: false },

  modules: [
    '@nuxt/ui',
    '@vueuse/motion/nuxt',
    '@nuxt/image',
  ],

  css: ['~/assets/css/main.css'],

  // SSG — prerender all pages for Netlify
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },

  // Google Fonts via head — preconnect for perf
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
  },
})
