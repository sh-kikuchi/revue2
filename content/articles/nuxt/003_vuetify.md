---
title: Vuetify3
description: Nuxt3に導入
category: nuxt
createdAt: 2022-11-19
updatedAt: 2022-11-19
sortNumber: 3
path: "/articles/nuxt/003_vuetify"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. 各種インストール](#2-各種インストール)
  - [■ Vuetify3のインストール](#-vuetify3のインストール)
  - [■ Material Design Iconsのインストール](#-material-design-iconsのインストール)
- [3. plugins/vuetify.tsを作成](#3-pluginsvuetifytsを作成)
- [4. nuxt.config.tsを修正](#4-nuxtconfigtsを修正)
- [5. おわりに](#5-おわりに)

<br>

## 1. はじめに
Nuxt3の場合、Vuetifyのプラグインの作成が必要で、めんどくさいけど、、、頑張る。

<br>

## 2. 各種インストール
### ■ Vuetify3のインストール
```ts
yarn add -D vuetify@next @vuetify/vite-plugin sass
```

<br>

### ■ Material Design Iconsのインストール
```ts
yarn add -D @mdi/js @mdi/font
```

<br>

## 3. plugins/vuetify.tsを作成
現時点でNuxtでVuetifyを利用する場合はプラグインを作る必要がある。
Material Design Iconsも読み込んどく。

```ts
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components
  })

  nuxtApp.vueApp.use(vuetify)
})

```

<br>

## 4. nuxt.config.tsを修正
```ts
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  css: ['vuetify/lib/styles/main.sass'],　←追加
  build: {
    transpile: ['vuetify'],　←追加
  },
})

```

## 5. おわりに
VuetifyのドキュメントがCompositionAPIに追いついていない。

</nuxt-content-wrapper>
