---
title: 【revuekitz】RangeField
description:
category: vue
createdAt: 2024-07-02
updatedAt: 2025-09-21
sortNumber: 310
path: "/documents/revuekitz/310_range_field"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="RangeField"></revue-components>

## ■ 概要（overview）
### コンポーネント名
- RangeField

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（category）
- fields

## ■ データ（data）

### 【reactive/ref】
- `rangeValue` (number): スライダーの現在の値を保持します。

### 【props】
- `initValue` (number): スライダーの初期値。
- `id` (string): スライダーのHTML要素のID属性。
- `class` (string): スライダーに適用される追加のCSSクラス。
- `name` (string): スライダーのHTML要素のname属性。
- `style` (string): スライダーに適用されるインラインスタイル。
- `styleReset` (boolean): スタイルをリセットするかどうかを示すフラグ。
- `min` (string): スライダーの最小値。
- `max` (string): スライダーの最大値。
- `step` (string): スライダーのステップ値。
- `isDisabled` (boolean): スライダーが無効化されているかどうかを示すフラグ。
- `isReadonly` (boolean): スライダーが読み取り専用であるかどうかを示すフラグ。

### 【emit】
- `update:modelValue`: スライダーの値が変更されたときに発行されるイベント。

### 【computed】
- `bindingClass`: `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-range-field ${props.class}` をクラス名として返す。

## ■ 使用例（usecase）
```vue
<script setup>
import { RangeField } from 'revuekitz'
import 'revuekitz/dist/style.css'
import { ref } from 'vue'

const rangeValue = ref('')

</script>

<template>
  <RangeField
    id="rangeFieldId"
    class="range-field-class"
    style="width: 300px"
    name="range_field_name"
    :initValue="50"
    :min="0"
    :max="100"
    :step="5"
    :isDisabled="false"
    :isReadonly="false"
    v-model="rangeValue"
  />
</template>

```

</nuxt-content-wrapper>