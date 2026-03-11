---
title: 【revuekitz】DataTable
description:
category: vue
createdAt: 2024-07-03
updatedAt: 2026-03-11
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

- `searchMode` (Boolean, default: `true`)  
  テーブルの検索機能の有効 / 無効を切り替えます。

- `paginationMode` (Boolean, default: `true`)  
  ページネーション機能の有効 / 無効を切り替えます。

- `headers` (Array, default: `['date', 'title', 'content']`)  
  テーブルのヘッダー名を指定します。  
  各カラムのキーとしても使用されます。

- `items` (Array, default: sample data)  
  テーブルに表示するデータ配列を指定します。  
  各要素はオブジェクト形式で、`headers` と対応するキーを持つ必要があります。

- `steps` (String | Number, default: `3`)  
  1ページに表示するデータ件数を指定します。

- `sortType` (String, default: `'desc'`)  
  カラムの初期ソート順を指定します。  

  - `asc` : 昇順  
  - `desc` : 降順

- `striped` (Boolean, default: `true`)  
  テーブルの行をストライプ表示（交互色）にするかを指定します。

- `selectable` (Boolean, default: `true`)  
  行選択機能（チェックボックス）を有効にします。


## ■ 使用例（Usage Example）

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DataTable } from 'revuekitz'
import 'revuekitz/dist/style.css'

const tableItems = ref([
  { date: '2024-01-01', title: 'Title 1', content: 'Content 1', author: 'Author 1' },
  { date: '2024-01-02', title: 'Title 2', content: 'Content 2', author: 'Author 2' },
  { date: '2024-01-03', title: 'Title 3', content: 'Content 3', author: 'Author 3' },
  { date: '2024-01-04', title: 'Title 4', content: 'Content 4', author: 'Author 4' },
  { date: '2024-01-05', title: 'Title 5', content: 'Content 5', author: 'Author 5' }
])

const selectedItems = ref([])
</script>

<template>
  <DataTable
    :searchMode="true"
    :paginationMode="true"
    :headers="['date','title','content','author']"
    :items="tableItems"
    :steps="5"
    sortType="asc"
    :striped="true"
    :selectable="true"
    v-model="selectedItems"
  />

  <div>
    Selected Rows: {{ selectedItems }}
  </div>
</template>

```

</nuxt-content-wrapper>