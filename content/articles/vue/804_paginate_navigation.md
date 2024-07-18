---
title: 【revuekitz】PaginateNavigation
description: 
category: vue
createdAt: 2024-07-03
updatedAt: 2024-07-03
sortNumber: 804
path: "/articles/vue/804_paginate_navigation"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- PaginateNavigation

### コンポーネントレベル
- 原子（Atom）

### カテゴリー（category）
- navigations

## ■ データ（Data）
### 【reactive/ref】
(なし)

### 【props】
- `id` (String, default: ''): コンポーネントのID。
- `style` (String, default: ''): インラインスタイル。
- `items` (Array, default: []): ページネーション対象のアイテム配列。
- `steps` (Number, default: 3): 1ページに表示するアイテムの数。

## ■ 使用例（Usage Example）
```vue
<template>
  <PaginateNavigation 
    :items="itemsArray" 
    :steps="3" 
    :id="'pagination'" 
    :style="{ color: 'blue' }" 
    @handleAction="handlePageChange"
  />
</template>

<script setup>
import { ref } from 'vue';

const itemsArray = ref([
  { name: 'Item 1' },
  { name: 'Item 2' },
  { name: 'Item 3' },
  { name: 'Item 4' },
  { name: 'Item 5' },
  { name: 'Item 6' },
  // More items...
]);

const handlePageChange = (items) => {
  console.log('Current Items:', items);
};
</script>

```

</nuxt-content-wrapper>