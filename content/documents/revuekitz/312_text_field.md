---
title: 【revuekitz】TextField
description:
category: vue
createdAt: 2024-07-20
updatedAt: 2026-10-10
sortNumber: 312
path: "/documents/revuekitz/312_text_field"
---

<nuxt-content-wrapper>

## ■ コンポーネントデモ(demo)
<revue-components component="TextField"></revue-components>

## ■ 概要（overview）
### コンポーネント名
- TextField

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（category）
- fields

## ■ データ（data）

### 【props】
- `id` (string): テキストフィールドのHTML要素のID属性。
- `class` (string): テキストフィールドに適用される追加のCSSクラス。
- `name` (string): テキストフィールドのHTML要素のname属性。
- `style` (string): テキストフィールドに適用されるインラインスタイル。
- `styleReset` (boolean): スタイルをリセットするかどうかを示すフラグ。
- `modelValue` (string): テキストフィールドの初期値。
- `type` (string, default: 'text'): 入力フィールドのタイプ（`'text'` | `'password'`）。
- `minlength` (string | number): テキストフィールドで許容される最小文字数。
- `maxlength` (string | number): テキストフィールドで許容される最大文字数。
- `isDisabled` (boolean): テキストフィールドが無効化されているかどうかを示すフラグ。
- `isReadonly` (boolean): テキストフィールドが読み取り専用であるかどうかを示すフラグ。
- `isRequired` (boolean, default: false): テキストフィールドを入力必須にするかどうかを示すフラグ。

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
    :isRequired="true"
    v-model="text"
  />
</template>

```

</nuxt-content-wrapper>
