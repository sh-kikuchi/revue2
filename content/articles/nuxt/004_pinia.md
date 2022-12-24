---
title: Pinia(工事中)
description: 状態管理をする
category: "nuxt"
createdAt: 2022-11-19
updatedAt: 2022-11-19
sortNumber: 4
# path: "/articles/nuxt/004_pinia"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. Piniaの準備](#2-piniaの準備)
  - [■ インストール](#-インストール)
  - [■ nuxt.config.ts](#-nuxtconfigts)
- [3. layoutsをカスタマイズしてみる](#3-layoutsをカスタマイズしてみる)
- [4. おわりに](#4-おわりに)

<br>


## 1. はじめに

## 2. Piniaの準備
### ■ インストール
```
yarn add @pinia/nuxt
npm install @pinia/nuxt
```

### ■ nuxt.config.ts
```
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@pinia/nuxt'
  ],
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],

  },
})

```

## 3. layoutsをカスタマイズしてみる






## 4. おわりに


参考
- [Create a Blog With Nuxt Content v2](https://mokkapps.de/blog/create-a-blog-with-nuxt-content-v2/)


</nuxt-content-wrapper>
