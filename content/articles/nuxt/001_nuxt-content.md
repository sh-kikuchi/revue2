---
title: Nuxt Contents
description: v2の胎動。
category: nuxt
createdAt: 2022-11-19
updatedAt: 2022-11-19
sortNumber: 1
path: "/articles/nuxt/001_nuxt-content"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. Nuxt Contents v2](#2-nuxt-contents-v2)
  - [■ Nuxt3をインストール](#-nuxt3をインストール)
  - [■ アプリを起動してみる](#-アプリを起動してみる)
- [3. 初期状態を確認する](#3-初期状態を確認する)
  - [■ contentディレクトリ](#-contentディレクトリ)
  - [■ app.vue(プロジェクトディレクトリ)](#-appvueプロジェクトディレクトリ)
  - [■ pages](#-pages)
- [4. おわりに](#4-おわりに)

<br>

## 1. はじめに
Nuxt-contentがV1とV2でちょっと変わったので、学び直し。

<br>

## 2. Nuxt Contents v2

### ■ Nuxt3をインストール
- `-t`オプションでTypeScript
- `content`を付けることでNuxt Contentも一緒にインストールしてくれる。

```
npx nuxi init nuxt-demo-blog -t content
```

<br>

### ■ アプリを起動してみる
- `yarn install`
- `yarn dev`


<br>

## 3. 初期状態を確認する

### ■ contentディレクトリ
```
├── content
│ ├── about.md
│ ├── index.md

```

index.mdの中身。NuxtをNuxt-content付でインストールした場合、アプリ起動の初期表示が下記のもの。

```md
# Nuxt Content

This page corresponds to the `/` route of your website. You can delete it or create another file in the `content/` directory.

Try to navigate to [/about](/about). These 2 pages are rendered by the `pages/[...slug].vue` component.

Look at the [Content documentation](https://content.nuxtjs.org/) to learn more.

```

上記のことからpagesの`[...slug].vue`によって、contentにあるマークダウンファイルをよしなにレンダリングしてくれているようだ。

<br>

### ■ app.vue(プロジェクトディレクトリ)
`<NuxtPage />`でpagesディレクトリのVueファイルをレンダリングしてくれるという理解。。

```js
<template>
  <div>
    <NuxtPage />
  </div>
</template>
```

<br>

### ■ pages
pagesの中に`[...slug].vue`が用意されている。

```js
<template>
  <main>
    <ContentDoc />
  </main>
</template>

```

デフォルトで`<ContentDoc />`はどこにいるのだろうと思ったら↓ココだった。
```js
export const ContentDoc: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue")['default']
```

ContentDocで最初にindex.mdが読まれている。


<br>

## 4. おわりに


参考
- [Create a Blog With Nuxt Content v2](https://mokkapps.de/blog/create-a-blog-with-nuxt-content-v2/)

</nuxt-content-wrapper>
