---
title: 【revuekitz】RangeField
description:
category: vue
createdAt: 2024-07-02
updatedAt: 2024-07-02
sortNumber: 408
path: "/articles/vue/409_range_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- RangeField

### コンポーネントレベル
- 原子（Atomic）

## ■ データ（data）

### 【reactive/ref】

- rangeValue (Number): 現在の範囲スライダーの値を保持します。

## ■ プロパティ（props）

- initValue (Number): 初期値として設定される範囲スライダーの値。
- id (String): 範囲スライダーのHTML要素のID属性。
- class (String): 範囲スライダーに適用される追加のCSSクラス。
- name (String): 範囲スライダーのHTML要素のname属性。
- style (String): 範囲スライダーに適用されるインラインスタイル。
- styleReset (Boolean): スタイルをリセットするかどうかを示すフラグ。
- min (String): 範囲スライダーの最小値。
- max (String): 範囲スライダーの最大値。
- step (String): 範囲スライダーのステップ。
- isDisabled (Boolean): 範囲スライダーが無効化されているかどうかを示すフラグ。
- isReadonly (Boolean): 範囲スライダーが読み取り専用モードであるかどうかを示すフラグ。

## ■ イベント（events）

### 【update:range-value】
- 範囲スライダーの値が変更されたときに発行されるイベント。

## ■ コンピューテッド（computed）

### 【bindingClass】
- `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-range-field ${props.class}` をクラス名として返します。

## ■ 使用例（usecase）
```vue
<template>
  <RangeField
    :initValue="50"
    id="example-range"
    class="example-range-field"
    style="padding: 10px; background-color: #f0f0f0; border: 1px solid #ccc;"
    name="exampleRange"
    :min="0"
    :max="100"
    :step="10"
    :isDisabled="false"
    :isReadonly="false"
    @update:range-value="handleRangeUpdate"
  />
</template>

<script setup>
import RangeField from '@/components/global/RangeField.vue'

const handleRangeUpdate = (newValue) => {
  console.log('Updated range value:', newValue)
}
</script>

```

</nuxt-content-wrapper>