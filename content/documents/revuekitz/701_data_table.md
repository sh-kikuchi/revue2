---
title: 【revuekitz】DataTable
description:
category: vue
createdAt: 2024-07-03
updatedAt: 2025-09-21
sortNumber: 701
path: "/documents/revuekitz/701_data_table"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="DataTable"></revue-components>

## ■ 概要（Overview）
### コンポーネント名
- DataTable

### レベル (Atomic Design)
- Molecules（分子）

### カテゴリー（category）
- tables

## ■ データ（Data）

### 【props】

- `seach_mode` (Boolean, default: true): 検索機能の有効/無効。
- `pagination_mode` (Boolean, default: true): ページネーション機能の有効/無効。
- `headers` (Array, default: () => ['日付', 'タイトル', '内容']): テーブルのヘッダー名。
- `items` (Array, default: () => []): テーブルに表示するデータ。
- `steps` (Number, default: 3): 1ページに表示するアイテムの数。

## ■ 使用例（Usage Example）

```vue
<script setup lang="ts">
import { DataTable } from 'revuekitz'
import 'revuekitz/dist/style.css'

const tableItems = ref([
  { date: '2024-01-01', title: 'Title 1', content: 'Content 1', author: 'Author 1' },
  { date: '2024-01-02', title: 'Title 2', content: 'Content 2', author: 'Author 2' },
  { date: '2024-01-03', title: 'Title 3', content: 'Content 3', author: 'Author 3' },
  { date: '2024-01-04', title: 'Title 4', content: 'Content 4', author: 'Author 4' },
  { date: '2024-01-05', title: 'Title 5', content: 'Content 5', author: 'Author 5' }
])

const targetData = ref([])
</script>

<template>
  <DataTable
    :search_mode="true"
    :pagination_mode="true"
    :headers="['Date', 'Title', 'Content', 'Author']"
    :items="tableItems"
    v-model="targetData"
    steps="5"
  />
  <div>{{ targetData }}</div>
</template>


```

</nuxt-content-wrapper>