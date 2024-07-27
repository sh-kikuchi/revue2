---
title: 【revuekitz】SelectField
description:
category: vue
createdAt: 2024-07-02
updatedAt: 2024-07-02
sortNumber: 310
path: "/articles/vue/310_select_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- SelectField

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（category）
- fields
- 
## ■ データ（data）

### 【reactive/ref】
- `selectedItem` (string): 現在選択されているアイテムの値を保持します。

### 【props】
- `items` (Array): コンポーネントで使用するアイテムのリスト（未使用）。
- `id` (string): セレクトボックスのHTML要素のID属性。
- `class` (string): セレクトボックスに適用される追加のCSSクラス。
- `name` (string): セレクトボックスのHTML要素のname属性。
- `style` (string): セレクトボックスに適用されるインラインスタイル。
- `styleReset` (boolean): スタイルをリセットするかどうかを示すフラグ。
- `initText` (string): 初期表示されるプレースホルダーテキスト。
- `selectedItem` (string): デフォルトで選択されるアイテムの値。
- `options` (Array<Option>): セレクトボックスの選択肢のリスト。`text` と `value` を持つオブジェクトの配列。

### 【emit】
- `update:selectedItem`: 選択されているアイテムが変更されたときに発行されるイベント。

### 【computed】
- `bindingClass`: `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-select-field dropdown-wrapper ${props.class}` をクラス名として返す。

## ■ 使用例（usecase）
```vue
<template>
  <SelectField
    id="example-select"
    class="example-select-field"
    style="width: 200px;"
    name="exampleSelect"
    :initText="'Please select an option'"
    :selectedItem="'B'"
    :options="[
      { text: 'Option 1', value: 'A' },
      { text: 'Option 2', value: 'B' },
      { text: 'Option 3', value: 'C' }
    ]"
    @update:selectedItem="handleSelectUpdate"
  />
</template>

<script setup>
import { SelectField } from 'revuekitz'
import 'revuekitz/dist/style.css'
import { ref } from 'vue'

const handleSelectUpdate = (newValue) => {
  console.log('Updated selected item:', newValue)
}
</script>

```

</nuxt-content-wrapper>