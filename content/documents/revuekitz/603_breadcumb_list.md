---
title: 【revuekitz】BreadcrumbList
description:
category: vue
createdAt: 2024-07-03
updatedAt: 2025-09-21
sortNumber: 603
path: "/documents/revuekitz/603_breadcumb_list"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="BreadcrumbList"></revue-components>

## ■ 概要（Overview）
### コンポーネント名
- BreadcrumbList

### レベル (Atomic Design)
- 原子（Atom）

### カテゴリー（category）
- lists

## ■ データ（Data）

### 【props】
- `items` (Array): ルート要素のアイテムを定義する配列。各アイテムは`href`（リンク先）と`name`（表示名）を含むオブジェクト。
- `id` (String): ルート要素のHTML要素のID属性。
- `class` (String): ルート要素のカスタムクラス。
- `style` (Object): ルート要素のインラインスタイル。

### 【computed】
- `bindingClass`: スタイルリセットフラグに応じたクラス名を返す (Returns class name based on styleReset flag)

## ■ 使用例（Usage Example）

```vue
<script setup lang="ts">
import { BreadcrumbList } from 'revuekitz'
import 'revuekitz/dist/style.css' 
</script>

<template>
  <BreadcrumbList 
    :items="[
      { href: '/', name: 'home' },
      { href: '/about', name: 'about' },
      { name: 'current page' }
    ]" 
    id="breadcrumbListId" 
    class="breadcrumb-list-class" 
    :style="{ color: 'blue' }" 
  />
</template>
```

</nuxt-content-wrapper>