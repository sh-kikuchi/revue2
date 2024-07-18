---
title: 【revuekitz】NavListItem
description: 
category: vue
createdAt: 2024-07-03
updatedAt: 2024-07-03
sortNumber: 803
path: "/articles/vue/803_NavListItem"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- NavListItem

### コンポーネントレベル
- 原子（Atom）

### カテゴリー（category）
- navigations

## ■ データ（Data）
### 【reactive/ref】
(なし)

### 【props】

- `to` (String, required): ナビゲーションリンクのURL。デフォルトは `/` です。
- `icon` (String, required): ナビゲーションリンクのアイコン。デフォルトは `mdi-vuetify` です。
- `linkName` (String, required): ナビゲーションリンクの名前。デフォルトは `vuetify` です。

## ■ 依存関係（Dependency）
（なし）

## ■ 使用例（Usage Example）

```vue
<template>
  <NavBar :isVisible="navBarVisible" @close="navBarVisible = false">
    <NavListItem to="/home" icon="mdi-home" linkName="Home" />
    <NavListItem to="/about" icon="mdi-information" linkName="About" />
    <NavListItem to="/contact" icon="mdi-contact-mail" linkName="Contact" />
  </NavBar>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/components/global/NavBar.vue'
import NavListItem from '@/components/global/NavListItem.vue'

const navBarVisible = ref(false)
</script>

```
</nuxt-content-wrapper>