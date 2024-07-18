---
title: 【revuekitz】GridRow
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 602
path: "/articles/vue/602_GridRow"
---

## ■ 概要（Overview）
### コンポーネント名
- GridRow

### レベル (Atomic Design)
- 原子（Atoms）

### カテゴリー（Category）
- layouts

## ■ データ（Data）

### 【reactive/ref】
(なし)

### 【props】
(なし)

### 【emit】
(なし)

### 【computed】
(なし)

## ■ イベント（Event）
(なし)

## ■ 依存関係（Dependency）
- GridColumn

## ■ 使用例（Usecase）
```vue
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

<script setup lang="ts">
import GridRow from './GridRow.vue'
import GridColumn from './GridColumn.vue'
</script>
```
