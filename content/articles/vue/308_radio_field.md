---
title: 【revuekitz】RadioField
description:
category: vue
createdAt: 2024-07-02
updatedAt: 2024-09-05
sortNumber: 308
path: "/articles/vue/308_radio_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- RadioField

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（category）
- fields

## ■ データ（data）

### 【reactive/ref】
- `selectedItem` (string): 選択されたラジオボタンの値を保持します。

### 【props】
- `items` (Array<string>): ラジオボタンの選択肢を含む配列
- `id` (string): ラジオボタンのHTML要素のID属性
- `class` (string): ラジオボタンに適用される追加のCSSクラス
- `name` (string): ラジオボタンのHTML要素のname属性
- `style` (string): ラジオボタンに適用されるインラインスタイル
- `styleReset` (boolean): スタイルをリセットするかどうかを示すフラグ
- `accentColor` (string): ラジオボタンのアクセントカラー
- `isDisabled` (boolean): ラジオボタンが無効化されているかどうかを示すフラグ
- `isReadonly` (boolean): ラジオボタンが読み取り専用であるかどうかを示すフラグ

### 【emit】
- `update:val`: 選択されたラジオボタンの値が変更されたときに発行されるイベント

### 【computed】
- `bindingClass`: `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-radio-field ${props.class}` をクラス名として返す

## ■ 使用例（usecase）
```vue
<script setup>
import { RadioField } from 'revuekitz'
import 'revuekitz/dist/style.css'
import { ref } from 'vue'

const radioCheckedItem = ref('')
const rangeItems = ref(['Option 1', 'Option 2', 'Option 3'])
</script>

<template>
  <RadioField
    :items="rangeItems"
    id="radioFieldId"
    class="radio-field-class"
    style="accent-color: red"
    name="radio_field_name"
    accentColor="red"
    :isDisabled="false"
    :isReadonly="false"
    v-model:val="radioCheckedItem"
  />
</template>

```

</nuxt-content-wrapper>