---
title: 【revuekitz】GridColumn
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2025-09-21
sortNumber: 501
path: "/documents/revuekitz/501_grid_column"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="GridRow"></revue-components>

## ■ 概要（Overview）
### コンポーネント名
- GridColumn

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（Category）
- layouts

## ■ データ（Data）

### 【props】
- `cols` (Number): カラム数（768~1199px）
- `sm_cols` (Number): スモールスクリーンサイズでのカラム数（767px未満）
- `lg_cols`(Number): ラージスクリーンサイズでのカラム数（1200px以上）

### 【computed】
- getColClass: `props.cols` と `props.sm_cols` に基づいて適切なクラスを生成する

## ■ 依存関係（Dependency）
- GridRowと合わせて使う

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