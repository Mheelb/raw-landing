export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
    '@nuxt/image',
  ],

  nitro: {
    prerender: {
      routes: ['/']
    }
  },

  app: {
    head: {
      title: 'RAW — améliore le cinéma',
      meta: [
        { name: 'description', content: 'Scan et transforme tes tickets de cinéma en collection vérifiée puis partage-les.' }
      ]
    }
  }
})