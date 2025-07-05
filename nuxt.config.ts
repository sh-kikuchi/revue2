// https://v3.nuxtjs.org/api/configuration/nuxt.config
// export default defineNuxtConfig({
// })
export default {
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/test-utils/module'
  ],
  css: ['@/assets/css/global.css'],
  loading: '@/components/global/layouts/Loading.vue',
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
        'php',
        'yaml'
      ]
    }
  },
  link: [
    //{ rel: "icon", type: "image/png", href: "/favicon/favicon-16x16.png" }, // これを追記する
    { hid: 'icon', rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { hid: 'apple-touch-icon', rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { hid: 'icon32', rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { hid: 'icon16', rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
  ],
  vue: {
    config: {
      css: {
        scopeBehaviour: 'global'
      }
    }
  }
}
