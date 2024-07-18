---
title: 【revuekitz】MultiLinesField
description:
category: vue
createdAt: 2024-07-02
updatedAt: 2024-07-02
sortNumber: 410
path: "/articles/vue/406_multi_lines_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- MultiLinesField

### コンポーネントレベル
- 原子（Atomic）

## ■ データ（data）

### 【reactive/ref】

- valueName (String): テキストエリアに入力された値を保持します。

## ■ プロパティ（props）

- id (String): テキストエリアのHTML要素のID属性。
- class (String): テキストエリアに適用される追加のCSSクラス。
- name (String): テキストエリアのHTML要素のname属性。
- style (String): テキストエリアに適用されるインラインスタイル。
- styleReset (Boolean): スタイルをリセットするかどうかを示すフラグ。
- isDisabled (Boolean): テキストエリアが無効化されているかどうかを示すフラグ。
- isReadonly (Boolean): テキストエリアが読み取り専用であるかどうかを示すフラグ。
- placeholder (String): テキストエリアのプレースホルダーテキスト。
- maxlength (Number): テキストエリアで許容される最大文字数。
- minlength (Number): テキストエリアで許容される最小文字数。
- rows (Number): テキストエリアの表示行数。
- cols (Number): テキストエリアの表示列数。
- valueName (String): テキストエリアの初期値。

## ■ イベント（events）

### 【update:valueName】
- テキストエリアの値が変更されたときに発行されるイベント。

## ■ コンピューテッド（computed）

### 【bindingClass】
- `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-text-area ${props.class}` をクラス名として返します。

## ■ 使用例（usecase）
```vue
<template>
  <TextArea
    id="example-textarea"
    class="example-textarea-field"
    style="width: 300px;"
    name="exampleTextarea"
    :valueName="textValue"
    :disabled="isDisabled"
    :readonly="isReadonly"
    :placeholder="placeholderText"
    :maxlength="maxCharacters"
    :rows="3"
    :cols="30"
    @update:valueName="handleTextUpdate"
  />
</template>

<script setup>
import TextArea from '@/components/global/TextArea.vue'

const textValue = ref('')
const isDisabled = ref(false)
const isReadonly = ref(false)
const placeholderText = 'Enter your text here'
const maxCharacters = 200

const handleTextUpdate = (newValue) => {
  console.log('Updated text:', newValue)
}
</script>

```

</nuxt-content-wrapper>