---
title: 【revuekitz】MultiLineField
description:
category: vue
createdAt: 2024-07-02
updatedAt: 2024-07-02
sortNumber: 306
path: "/articles/vue/306_multi_line_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- MultiLineField

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（category）
- fields

## ■ データ（data）

### 【reactive/ref】
- `valueName` (string): テキストエリアに入力された値を保持します。

### 【props】
- `id` (string): テキストエリアのHTML要素のID属性
- `class` (string): テキストエリアに適用される追加のCSSクラス
- `name` (string): テキストエリアのHTML要素のname属性
- `style` (string): テキストエリアに適用されるインラインスタイル
- `styleReset` (boolean): スタイルをリセットするかどうかを示すフラグ
- `isDisabled` (boolean): テキストエリアが無効化されているかどうかを示すフラグ
- `isReadonly` (boolean): テキストエリアが読み取り専用であるかどうかを示すフラグ
- `placeholder` (string): テキストエリアのプレースホルダーテキスト
- `maxlength` (number): テキストエリアで許容される最大文字数
- `minlength` (number): テキストエリアで許容される最小文字数
- `rows` (number): テキストエリアの表示行数
- `cols` (number): テキストエリアの表示列数
- `valueName` (string): テキストエリアの初期値

### 【emit】
- `update:valueName` - テキストエリアの値が変更されたときに発行されるイベント

## ■ 使用例（usecase）
```vue
<script setup>
import { MultiLinesField }  from 'revuekitz'
import 'revuekitz/dist/style.css' 
import { ref } from 'vue'

const textValue = ref('')
const isDisabled = ref(false)
const isReadonly = ref(false)
const placeholderText = 'Enter your text here'
const maxCharacters = 200

const handleTextUpdate = (newValue) => {
  console.log('Updated text:', newValue)
}
</script>

<template>
  <MultiLineField
    id="multiLinesFieldId"
    class="multi-lines-field-class"
    style="width: 300px;"
    name="multi_lines_field_name"
    :valueName="textValue"
    :isDisabled="isDisabled"
    :isReadonly="isReadonly"
    :placeholder="placeholderText"
    :maxlength="maxCharacters"
    :rows="3"
    :cols="30"
    @update:value-name="handleTextUpdate"
  />
</template>

</nuxt-content-wrapper>
```





