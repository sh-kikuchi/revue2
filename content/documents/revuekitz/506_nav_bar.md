---
title: 【revuekitz】NavBar
description: 
category: vue
createdAt: 2024-07-03
updatedAt: 2025-09-21
sortNumber: 506
path: "/documents/revuekitz/506_nav_bar"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="NavBar"></revue-components>

## ■ 概要（Overview）
### コンポーネント名
- NavBar

### レベル (Atomic Design)
- 原子（Atom）

### カテゴリー（category）
- navigations

## ■ データ（Data）

### 【props】
- `isVisible` (Boolean, required): ナビゲーションバーの表示・非表示を制御するフラグです。デフォルトは `false` です。

### 【emit】
- `close`:ナビゲーションバーが閉じられたときに発火するイベント。

## ■ 使用例（Usage Example）

```vue
<script setup>
import { ref } from 'vue'
import { NavBar } from 'revuekitz'

import { mdiInformationOutline } from '@mdi/js'

const navBarVisible = ref(false)
const showNavBar = () => {
  navBarVisible.value = true
}
const closeNavBar = () => {
  navBarVisible.value = false
}
</script>

<template>
  <div class="three-lines mr-2" @click="showNavBar">&equiv;</div>
  <NavBar :isVisible="navBarVisible" @close="closeNavBar">
    <NavBarItem to="" :icon="mdiInformationOutline" linkName="TEST" />
  </NavBar>
</template>

```

</nuxt-content-wrapper>