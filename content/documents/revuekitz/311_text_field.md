---
title: 【revuekitz】TextField
description:
category: vue
createdAt: 2024-07-20
updatedAt: 2024-09-05
sortNumber: 311
path: "/documents/revuekitz/311_text_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- TextField

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（category）
- fields

## ■ データ（data）

### 【reactive/ref】
- `bindingValue` (string): テキストフィールドの値を保持します。

### 【props】
- `id` (string): テキストフィールドのHTML要素のID属性。
- `class` (string): テキストフィールドに適用される追加のCSSクラス。
- `name` (string): テキストフィールドのHTML要素のname属性。
- `style` (string): テキストフィールドに適用されるインラインスタイル。
- `styleReset` (boolean): スタイルをリセットするかどうかを示すフラグ。
- `text` (string): テキストフィールドの初期値。
- `minlength` (string | number): テキストフィールドで許容される最小文字数。
- `maxlength` (string | number): テキストフィールドで許容される最大文字数。
- `isDisabled` (boolean): テキストフィールドが無効化されているかどうかを示すフラグ。
- `isReadonly` (boolean): テキストフィールドが読み取り専用であるかどうかを示すフラグ。

### 【emit】
- `update:modelValue`: テキストフィールドの値が変更されたときに発行されるイベント。

### 【computed】
- `bindingClass`: `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-text-field ${props.class}` をクラス名として返す。

## ■ 使用例（usecase）
```vue
<script setup>
import { TextField } from 'revuekitz'
import 'revuekitz/dist/style.css'
import { ref } from 'vue'

const text = ref('text')
</script>

<template>
  <TextField
    id="textFieldId"
    class="text-field-class"
    style="width: 300px"
    name="text_field_name"
    :minlength="5"
    :maxlength="10"
    :isDisabled="false"
    :isReadonly="false"
    v-model="text"
    required
  />
</template>

```

</nuxt-content-wrapper>