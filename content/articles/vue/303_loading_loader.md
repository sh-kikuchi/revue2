---
title: 【revuekitz】LoadingLoader
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 303
path: "/articles/vue/303_loading_loader"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- LoadingLoader

### レベル (Atomic Design)
- 原子（Atomic）

### カテゴリー（Category）
- displays

## ■ データ（Data）

### 【reactive/ref】
- `loading` (boolean): ローディング状態 (Loading state)

### 【props】

### 【emit】

### 【computed】

## ■ イベント（Event）

## ■ 依存関係（Dependency）

## ■ 使用例（Usecase）
```vue
<template>
  <LoadingLoader>
    <span>Loading...</span>
  </LoadingLoader>
</template>

<script setup lang="ts">
import LoadingLoader from './LoadingLoader.vue'
</script>
```

</nuxt-content-wrapper>