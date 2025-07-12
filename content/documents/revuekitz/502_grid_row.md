---
title: 【revuekitz】GridRow
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 502
path: "/documents/revuekitz/502_GridRow"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- GridRow

### レベル (Atomic Design)
- 原子（Atoms）

### カテゴリー（Category）
- layouts

## ■ 依存関係（Dependency）
- GridColumn

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import { GridRow } from 'revuekitz'
import { GridColumn } from 'revuekitz'
import 'revuekitz/dist/style.css' 
</script>

<template>
  <GridRow>
    <GridColumn :cols="6" :sm_cols="12">
      <div>Column 1</div>
    </GridColumn>
    <GridColumn :cols="6" :sm_cols="12">
      <div>Column 2</div>
    </GridColumn>
  </GridRow>
</template>

```
</nuxt-content-wrapper>