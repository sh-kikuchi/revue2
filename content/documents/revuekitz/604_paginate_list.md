---
title: 【revuekitz】PaginateNavigation
description: 
category: vue
createdAt: 2024-07-03
updatedAt: 2025-09-21
sortNumber: 604
path: "/documents/revuekitz/604_paginate_list"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="PaginateList"></revue-components>

## ■ 概要（Overview）
### コンポーネント名
- PaginateList

### レベル (Atomic Design)
- 原子（Atom）

### カテゴリー（category）
- lists

## ■ データ（Data）

### 【props】
- `id` (String, default: ''): コンポーネントのID。
- `style` (String, default: ''): インラインスタイル。
- `items` (Array, default: []): ページネーション対象のアイテム配列。
- `steps` (Number, default: 3): 1ページに表示するアイテムの数。

## ■ 使用例（Usage Example）
```vue
<script setup>
import { PaginateList } from 'revuekitz'
import 'revuekitz/dist/style.css'
import { ref } from 'vue'
const items = ref([
  { id: 1, name_en: 'coffee' },
  { id: 2, name_en: 'espresso' },
  { id: 3, name_en: 'cappuccino' },
  { id: 4, name_en: 'mocha' },
  { id: 5, name_en: 'tea' },
  { id: 6, name_en: 'sandwich' },
  { id: 7, name_en: 'hotdog' },
  { id: 8, name_en: 'omelette' },
  { id: 9, name_en: 'salad' },
  { id: 10, name_en: 'curry' }
]) 

const getDispItems = (dispArray) => {
  displayItems.value = dispArray
}
</script>

<template>
  <ul>
    <li v-for="item in displayItems" :key="item.id">
      <span>{{ item.name_en }}</span>
    </li>
  </ul>
  <PaginateList 
    :items="items" 
    steps="3" 
    @handleAction="getDispItems"
  />
</template>

```

</nuxt-content-wrapper>