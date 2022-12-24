// https://v3.nuxtjs.org/api/configuration/nuxt.config
// export default defineNuxtConfig({
// })
export default {
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
  ],
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  loading: '@/components/commons/Loading.vue',
  content: {
    highlight: {
      theme: 'dracula',
      preload: [
        'bash',
        'diff',
        'docker',
        'go',
        'graphql',
        'html',
        'js',
        'json',
        'makefile',
        'ts',
        'vue',
        'yaml'
      ]
    }
  },
}
