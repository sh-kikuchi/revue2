---
title: 【revuekitz】PageTitle
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-12
sortNumber: 206
path: "/documents/revuekitz/206_page_title"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- PageTitle

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（Category）
- displays

## ■ データ（Data）

### 【props】
- `id` (string): ルート要素のID
- `class` (string): ルート要素のクラス名
- `style` (string): ルート要素のスタイル
- `styleReset` (boolean): スタイルのリセットフラグ

### 【computed】
- `bindingClass`: `props.class`, `props.styleReset` の値に基づいてクラス名を設定

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import { PageTitle } from 'revuekitz'
import 'revuekitz/dist/style.css' 
</script>

<template>
  <PageTitle
    id="pegeTitleId"
    class="page-title-class"
    :style="'color: blue;'"
  >
    page title
  </PageTitle>
</template>

```

</nuxt-content-wrapper>