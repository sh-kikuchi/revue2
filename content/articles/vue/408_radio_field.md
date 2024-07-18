---
title: 【revuekitz】RadioField
description: A radio button group component with options and bindings.
category: vue
createdAt: 2024-07-02
updatedAt: 2024-07-02
sortNumber: 407
path: "/articles/vue/408_radio_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- RadioField

### コンポーネントレベル
- 原子（Atomic）

## ■ データ（data）

### 【reactive/ref】

- selectedItem (String): 選択されたラジオボタンの値を保持します。

## ■ プロパティ（props）

- items (Array<string>): ラジオボタンの選択肢として表示される文字列の配列。
- id (String): ラジオボタンのHTML要素のID属性。
- class (String): ラジオボタンに適用される追加のCSSクラス。
- name (String): ラジオボタンのHTML要素のname属性。
- style (String): ラジオボタンに適用されるインラインスタイル。
- styleReset (Boolean): スタイルをリセットするかどうかを示すフラグ。
- accentColor (String): アクセントカラーとして使用される色。
- isDisabled (Boolean): ラジオボタンが無効化されているかどうかを示すフラグ。
- isReadonly (Boolean): ラジオボタンが読み取り専用モードであるかどうかを示すフラグ。

## ■ イベント（events）

### 【update:radio】
- ラジオボタンの値が変更されたときに発行されるイベント。

## ■ コンピューテッド（computed）

### 【bindingClass】
- `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-radio-field ${props.class}` をクラス名として返します。

## ■ 使用例（usecase）
```vue
<template>
  <RadioField
    :items="['Option 1', 'Option 2', 'Option 3']"
    id="example-radio"
    class="example-radio-field"
    style="padding: 10px; background-color: #f0f0f0; border: 1px solid #ccc;"
    name="exampleRadio"
    :accentColor="'#ff0000'"
    :isDisabled="false"
    :isReadonly="false"
    @update:radio="handleRadioUpdate"
  />
</template>

<script setup>
import RadioField from '@/components/global/RadioField.vue'

const handleRadioUpdate = (selectedValue) => {
  console.log('Selected radio:', selectedValue)
}
</script>

```

</nuxt-content-wrapper>