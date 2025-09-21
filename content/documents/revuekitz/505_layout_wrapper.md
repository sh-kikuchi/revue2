---
title: 【revuekitz】LayoutWrapper
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2025-09-21
sortNumber: 505
path: "/documents/revuekitz/505_layout_wrapper"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="LayoutWrapper"></revue-components>

## ■ 概要（Overview）
### コンポーネント名
- LayoutWrapper

### レベル (Atomic Design)
- 原子（Atoms）

### カテゴリー（Category）
- レイアウト (Layout)

## ■ データ（Data）

### 【props】
- `id` (string) - ラッパーのID
- `class` (string) - ラッパーのクラス
- `style` (string | object) - ラッパーのスタイル
- `maxWidth` (string) - 最大幅（デフォルト: '1024px'）

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import { LayoutWrapper } from 'revuekitz'
import 'revuekitz/dist/style.css' 
</script>

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

```

</nuxt-content-wrapper>