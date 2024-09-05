---
title: 【revuekitz】NumberField
description:
category: vue
createdAt: 2024-07-02
updatedAt: 2024-09-05
sortNumber: 307
path: "/articles/vue/307_number_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- NumberField

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（category）
- fields

## ■ データ（data）

### 【reactive/ref】
- `value` (number): 入力された数値を保持します。

### 【props】
- `id` (string): 数値入力フィールドのHTML要素のID属性
- `class` (string): 数値入力フィールドに適用される追加のCSSクラス
- `style` (string): 数値入力フィールドに適用されるインラインスタイル
- `styleReset` (boolean): スタイルをリセットするかどうかを示すフラグ
- `name` (string): 数値入力フィールドのHTML要素のname属性
- `number` (number): 数値入力フィールドの初期値
- `min` (string|number): 数値入力フィールドで許容される最小値
- `max` (string|number): 数値入力フィールドで許容される最大値
- `isDisabled` (boolean): 数値入力フィールドが無効化されているかどうかを示すフラグ
- `isReadonly` (boolean): 数値入力フィールドが読み取り専用であるかどうかを示すフラグ

### 【emit】
- `update:val`: 数値が変更されたときに発行されるイベント

### 【computed】
- `bindingClass`: `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-number-field ${props.class}` をクラス名として返す

## ■ 使用例（usecase）
```vue

<script setup>
import { NumberField } from 'revuekitz'
import 'revuekitz/dist/style.css'
import { ref } from 'vue'

const numberValue = ref(100)
</script>

<template>
  <NumberField
    id="numberFieldId"
    class="number-field-class"
    :style="{ backgroundColor: '#f0f0f0', border: '1px solid #ccc' }"
    name="number_field_name"
    :min="0"
    :max="7000"
    :isDisabled="false"
    :isReadonly="false"
    :number="numberValue"
    v-model:val="numberValue"
  />
</template>

```

</nuxt-content-wrapper>