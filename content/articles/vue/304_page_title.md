---
title: 【revuekitz】PageTitle
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 304
path: "/articles/vue/304_page_title"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- PageTitle

### レベル (Atomic Design)
- 原子（Atomic）

### カテゴリー（Category）
- displays

## ■ データ（Data）

### 【reactive/ref】

### 【props】
- `id` (string): ルート要素のID
- `class` (string): ルート要素のクラス名
- `style` (string): ルート要素のスタイル
- `styleReset` (boolean): スタイルのリセットフラグ

### 【emit】
（なし）

### 【computed】
- `bindingClass`: `props.class`, `props.styleReset` の値に基づいてクラス名を設定

## ■ イベント（Event）
（なし）

## ■ 依存関係（Dependency）
(なし)

## ■ 使用例（Usecase）
```vue
<template>
  <PageTitle
    id="pegeTitleId"
    class="page-title-class"
    :style="'color: blue;'"
  >
    page title
  </PageTitle>
</template>

<script setup lang="ts">
import PageTitle from './PageTitle.vue'
</script>

```

</nuxt-content-wrapper>