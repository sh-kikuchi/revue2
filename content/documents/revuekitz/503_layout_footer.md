---
title: 【revuekitz】LayoutFooter
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2026-09-15
sortNumber: 503
path: "/documents/revuekitz/503_layout_footer"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="LayoutFooter"></revue-components>

## ■ 概要（Overview）
### コンポーネント名
- LayoutFooter

### レベル (Atomic Design)
- 原子（Atoms）

### カテゴリー（Category）
- layouts

## ■ データ（Data）

### 【props】
- `id` (string) - フッターのID
- `class` (string) - フッターのクラス
- `style` (string | object) - フッターのスタイル

### 【computed】
- bindingClass: `props.class`の値をベースにしたクラス名

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import { LayoutFooter } from 'revuekitz'
import 'revuekitz/dist/style.css' 
</script>
<template>
  <LayoutWrapper style="border: 1px solid black">
    <h1>Re:Vue</h1>
    <section>
      LayoutWrapper Area
    </section>
  </LayoutWrapper>
</template>
```

<nuxt-content-wrapper>
