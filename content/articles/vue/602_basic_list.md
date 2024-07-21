---
title: 【revuekitz】BasicList
description: 
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 602
path: "/articles/vue/602_basic_list"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- Basic List

### レベル (Atomic Design)
- 原子（Atoms）

### カテゴリー（Category）
- lists

## ■ データ（Data）
### 【reactive/ref】
- `items`: 現在のリストアイテムの配列 (Reactive list of items)

### 【props】
- `id` (string) - コンポーネントのID
- `class` (string) - コンポーネントのクラス
- `style` (string) - コンポーネントのスタイル
- `styleReset` (boolean) - スタイルリセットフラグ
- `items` (Array) - 表示するアイテムの配列

### 【emit】
- `update:value`: アイテムがクリックされたときに発火 (Emits item value on click)

### 【computed】
- `bindingClass`: スタイルリセットフラグに応じたクラス名を返す (Returns class name based on styleReset flag)

## ■ イベント（Event）
- `deleteItem(index: number)`: アイテムをリストから削除する (Deletes an item from the list)

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import BasicList from 'revuekitz'
</script>

<template>
  <BasicList
    id="basicListId"
    class="basic-list-class"
    :style="{ color: 'black' }"
    :styleReset="false"
    :items="[
      { id: '1', title: 'Custom Item #1', value: 1, href: '#' },
      { id: '2', title: 'Custom Item #2', value: 2 }
    ]"
    @update:value="value => console.log(value)"
  />
</template>

``` 

</nuxt-content-wrapper>