---
title: 【revuekitz】DataTable
description: A versatile data table component with search and pagination functionalities.
category: vue
createdAt: 2024-07-03
updatedAt: 2024-07-03
sortNumber: 901
path: "/articles/vue/901_data_table"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- DataTable

### コンポーネントレベル
- 分子（Molecule）

### カテゴリー（category）
- tables

## ■ データ（Data）

### 【props】

- `seach_mode` (Boolean, default: true): 検索機能の有効/無効。
- `pagination_mode` (Boolean, default: true): ページネーション機能の有効/無効。
- `headers` (Array, default: () => ['日付', 'タイトル', '内容']): テーブルのヘッダー名。
- `items` (Array, default: () => []): テーブルに表示するデータ。

## ■ 使用例（Usage Example）

```vue
<template>
  <DataTable
    :seach_mode="true"
    :pagination_mode="true"
    :headers="['日付', 'タイトル', '内容']"
    :items="tableItems"
  />
</template>

<script setup lang="ts">
import DataTable from '../components/DataTable.vue'

const tableItems = ref([
  { date: '2024-01-01', title: 'タイトル1', content: '内容1' },
  { date: '2024-01-02', title: 'タイトル2', content: '内容2' },
  { date: '2024-01-03', title: 'タイトル3', content: '内容3' },
])
</script>

```

</nuxt-content-wrapper>