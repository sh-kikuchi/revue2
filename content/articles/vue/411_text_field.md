---
title: 【revuekitz】TextField
description:
category: vue
createdAt: 2024-07-02
updatedAt: 2024-07-02
sortNumber: 411
path: "/articles/vue/411_text_field"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- TextField

### コンポーネントレベル
- 原子（Atomic）

## ■ データ（Data）

### 【reactive/ref】

- bindingValue (String): 入力されたテキストを保持します。

## ■ プロパティ（Props）

- id (String): テキストフィールドのHTML要素のID属性。
- class (String): テキストフィールドに適用される追加のCSSクラス。
- name (String): テキストフィールドのHTML要素のname属性。
- style (String): テキストフィールドに適用されるインラインスタイル。
- styleReset (Boolean): スタイルをリセットするかどうかを示すフラグ。
- bindingValue (String): テキストフィールドのバインドされた値。
- minlength (Number): テキストフィールドで許容される最小文字数。
- maxlength (Number): テキストフィールドで許容される最大文字数。
- isDisabled (Boolean): テキストフィールドが無効化されているかどうかを示すフラグ。
- isReadonly (Boolean): テキストフィールドが読み取り専用であるかどうかを示すフラグ。

## ■ イベント（Events）

### 【update:bindingValue】
- テキストフィールドの値が変更されたときに発行されるイベント。

## ■ コンピューテッド（Computed）

### 【bindingClass】
- `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-text-field ${props.class}` をクラス名として返します。

## ■ 使用例（Usage Example）

```vue
<template>
  <TextField
    id="example-textfield"
    class="example-textfield-field"
    style="width: 300px;"
    name="exampleTextField"
    v-model="inputValue"
    :minlength="minLength"
    :maxlength="maxLength"
    :disabled="isDisabled"
    :readonly="isReadonly"
    @update:bindingValue="handleInputChange"
  />
</template>

<script setup>
import TextField from '@/components/global/TextField.vue'
import { ref } from 'vue'

const inputValue = ref('')
const minLength = 0
const maxLength = 100
const isDisabled = false
const isReadonly = false

const handleInputChange = (newValue) => {
  console.log('Updated text:', newValue)
}
</script>

```

</nuxt-content-wrapper>