---
title: 【revuekitz】LayoutWrapper
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 605
path: "/articles/vue/605_LayoutWrapper"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- LayoutWrapper

### レベル (Atomic Design)
- 原子（Atoms）

### カテゴリー（Category）
- レイアウト (Layout)

## ■ データ（Data）

### 【reactive/ref】
（なし）

### 【props】
- `id` (string) - ラッパーのID
- `class` (string) - ラッパーのクラス
- `style` (string | object) - ラッパーのスタイル
- `maxWidth` (string) - 最大幅（デフォルト: '1024px'）

### 【emit】
（なし）

### 【computed】
（なし）

## ■ イベント（Event）
（なし）

## ■ 依存関係（Dependency）
（なし）

## ■ 注意事項（Notice）
（なし）

## ■ 使用例（Usecase）
```vue
<template>
  <LayoutWrapper
    id="layoutWrapperId"
    class="layout-wrapper-class"
    :maxWidth="'800px'"
  >
    <h1>My Website Content</h1>
    <p>This content is wrapped with a maximum width.</p>
  </LayoutWrapper>
</template>

<script setup lang="ts">
import LayoutWrapper from './LayoutWrapper.vue'
</script>
