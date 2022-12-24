---
title: Nuxt Contents 2
description: v2の使途。
category: nuxt
createdAt: 2022-11-19
updatedAt: 2022-11-19
sortNumber: 2
path: "/articles/nuxt/002_nuxt-content"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. Layouts](#2-layouts)
- [3. layoutsをカスタマイズしてみる](#3-layoutsをカスタマイズしてみる)
  - [■ layoutsにcustom.vueを用意してみる](#-layoutsにcustomvueを用意してみる)
  - [■ app.vue](#-appvue)
  - [■ pages/index.vue](#-pagesindexvue)
- [4. おわりに](#4-おわりに)

<br>


## 1. はじめに
Nuxt-contentがV1とV2でちょっと変わったので、学び直し。(2回目)

<br>

## 2. Layouts
レイアウトの共通パターンをここで設定し、app.vueで`<NuxtLayout>`で読み込むことが出来るようだ。ここでプロジェクトディレクトリに`layoutsフォルダ`を作成し、その中に`default.vue`を用意してみる。
```js
<template>
  <div>
    Some default layout shared across all pages
    <slot />
  </div>
</template>

```

次にapp.vueで下記のように書き換える。
```js
<template>
  <NuxtLayout>
    some page content
  </NuxtLayout>
</template>
```

アプリ起動したら1行でこんな文字列が。。App.vueで`<NuxtLayout>`を挟んで記述した"some page content"の部分がdefault.vueの`slot`で呼ばれていることが分かる。

```
Some default layout shared across all pages some page content
```

<br>

## 3. layoutsをカスタマイズしてみる

### ■ layoutsにcustom.vueを用意してみる
```js
<template>
  <div>
    Some *custom* layout
    <slot />
  </div>
</template>
```

<br>

### ■ app.vue
```js
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

<br>

### ■ pages/index.vue
app.vueの`<NuxtPage />`タグを配置すると、pagesディレクトリで`index.vue`があれば最初に読み込まれる。嗚呼、`definePageMeta`を利用して、ページによってlayoutのモードを変えられるというのか。
```js
<template>
  <p>definePageMeta</p>
  <pre>
    definePageMeta({
      layout: "custom",
    });
  </pre>
</template>
<script>
definePageMeta({
  layout: "custom",
});
</script>
```

<br>

※ボタンで切り替えるレイアウト変更(`pages/index.vue`)
`definePageMeta`で初期のレイアウトを設定し、ボタンでイベントを発火させている。
関数の中の`setPageLayout`でレイアウトのモードを変えることが出来る。

```js
<template>
  <p>definePageMeta</p>
  <button @click="changeLayout">ChangeCustom</button>
  <pre>
    definePageMeta({
      layout: "custom",
    });
  </pre>
</template>

<script setup>
function changeLayout() {
  setPageLayout('custom')
}
definePageMeta({
  layout: 'default',
});
</script>

```

<br>

## 4. おわりに
日本語文献が少ない。


参考
- [Create a Blog With Nuxt Content v2](https://mokkapps.de/blog/create-a-blog-with-nuxt-content-v2/)

</nuxt-content-wrapper>
