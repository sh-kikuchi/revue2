---
title: 【revuekitz】NavListItem
description: 
category: vue
createdAt: 2024-07-03
updatedAt: 2024-07-03
sortNumber: 507
path: "/articles/vue/507_nav_list_item"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- NavListItem

### レベル (Atomic Design)
- 原子（Atom）

### カテゴリー（category）
- navigations

## ■ データ（Data）

### 【props】

- `to` (String, required): ナビゲーションリンクのURL。デフォルトは `/` です。
- `icon` (String, required): ナビゲーションリンクのアイコン。デフォルトは `mdi-vuetify` です。
- `linkName` (String, required): ナビゲーションリンクの名前。デフォルトは `vuetify` です。

## ■ 使用例（Usage Example）

```vue
<script setup>
import { ref } from 'vue'
import NavBar from '@/components/global/NavBar.vue'
import NavListItem from '@/components/global/NavListItem.vue'

const navBarVisible = ref(false)
</script>

<template>
  <NavBar :isVisible="navBarVisible" @close="navBarVisible = false">
    <NavListItem to="/home" icon="mdi-home" linkName="Home" />
    <NavListItem to="/about" icon="mdi-information" linkName="About" />
    <NavListItem to="/contact" icon="mdi-contact-mail" linkName="Contact" />
  </NavBar>
</template>

```
</nuxt-content-wrapper>