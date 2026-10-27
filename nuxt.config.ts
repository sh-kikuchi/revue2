// https://v3.nuxtjs.org/api/configuration/nuxt.config
// export default defineNuxtConfig({
// })
export default {
  // 未設定時のフォールバック日付と同じ値を明示し、挙動を変えずに警告だけ消す
  compatibilityDate: "2025-07-15",
  // content/ の Markdown は modules/ox-content.ts (自動登録) で処理する
  modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  css: ["@/assets/css/global.css", "@/assets/css/ox-content-dracula.css"],
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },
  link: [
    //{ rel: "icon", type: "image/png", href: "/favicon/favicon-16x16.png" }, // これを追記する
    { hid: "icon", rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    {
      hid: "apple-touch-icon",
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    { hid: "icon32", rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
    { hid: "icon16", rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
  ],
  vue: {
    config: {
      css: {
        scopeBehaviour: "global",
      },
    },
  },
};
