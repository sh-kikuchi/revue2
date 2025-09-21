---
title: 【revuekitz】NavListItem
description: 
category: vue
createdAt: 2024-07-03
updatedAt: 2024-07-03
sortNumber: 507
path: "/documents/revuekitz/507_nav_list_item"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="NavBar"></revue-components>

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