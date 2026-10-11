---
title: 【revuekitz】SelectField
description:
category: vue
createdAt: 2024-07-02
updatedAt: 2026-10-10
sortNumber: 310
path: "/documents/revuekitz/310_select_field"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="SelectField"></revue-components>

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
- `modelValue` (string): デフォルトで選択されるアイテムの値。
- `options` (Array<Option>): セレクトボックスの選択肢のリスト。`text` と `value` を持つオブジェクトの配列。
- `isRequired` (boolean, default: false): セレクトボックスを選択必須にするかどうかを示すフラグ。
- `isDisabled` (boolean, default: false): セレクトボックスの無効状態。
- `isReadonly` (boolean, default: false): セレクトボックスの読み取り専用状態。`<select>`要素はネイティブの`readonly`属性に対応していないため、`change`イベント側で選択を元の値に戻すことで読み取り専用の挙動を実現している。

### 【emit】
- `update:modelValue`: 選択されているアイテムが変更されたときに発行されるイベント。

### 【computed】
- `bindingClass`: `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-select-field dropdown-wrapper ${props.class}` をクラス名として返す。

## ■ 使用例（usecase）
```vue
<script setup>
import { SelectField } from 'revuekitz'
import 'revuekitz/dist/style.css'
import { ref } from 'vue'

const selectedItem = ref('C3')
const optionItems = [
  { text: 'Option 1', value: 'A1' },
  { text: 'Option 2', value: 'B2' },
  { text: 'Option 3', value: 'C3' }
]
</script>
<template>
  <SelectField
    id="example-select"
    class="example-select-field"
    style="width: 200px;"
    name="exampleSelect"
    :initText="'Please select an option'"
    :options="optionItems"
    :isRequired="false"
    :isDisabled="false"
    :isReadonly="false"
    v-model="selectedItem"
  />
</template>

```

</nuxt-content-wrapper>
