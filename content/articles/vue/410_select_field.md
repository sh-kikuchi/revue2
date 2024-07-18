---
title: 【revuekitz】SelectField
description:
category: vue
createdAt: 2024-07-02
updatedAt: 2024-07-02
sortNumber: 409
path: "/articles/vue/410_select_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- SelectField

### コンポーネントレベル
- 原子（Atomic）

## ■ データ（data）

### 【reactive/ref】

- selectedItem (String): 現在選択されているアイテムの値を保持します。

## ■ プロパティ（props）

- items (Array): 選択可能なアイテムのリスト。
- id (String): セレクトボックスのHTML要素のID属性。
- class (String): セレクトボックスに適用される追加のCSSクラス。
- name (String): セレクトボックスのHTML要素のname属性。
- style (String): セレクトボックスに適用されるインラインスタイル。
- styleReset (Boolean): スタイルをリセットするかどうかを示すフラグ。
- initText (String): 初期表示テキスト。
- selectedItem (String): 初期選択されるアイテムの値。
- options (Array): オプションのリスト。各オプションは `{ text: '表示テキスト', value: '実際の値' }` の形式です。

## ■ イベント（events）

### 【update:selectedItem】
- アイテムが選択されたときに発行されるイベント。

## ■ コンピューテッド（computed）

### 【bindingClass】
- `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-select-field dropdown-wrapper ${props.class}` をクラス名として返します。

## ■ 使用例（usecase）
```vue
<template>
  <SelectField
    :items="options"
    id="example-select"
    class="example-select-field"
    style="width: 200px;"
    name="exampleSelect"
    :initText="initText"
    :selectedItem="selectedItem"
    @update:selectedItem="handleSelectUpdate"
  />
</template>

<script setup>
import SelectField from '@/components/global/SelectField.vue'

const options = [
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
]
const initText = 'Please select'
const selectedItem = 'A'

const handleSelectUpdate = (newValue) => {
  console.log('Selected item:', newValue)
}
</script>

```

</nuxt-content-wrapper>