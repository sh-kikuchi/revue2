---
title: 【revuekitz】NumberField
description:
category: vue
createdAt: 2024-07-02
updatedAt: 2024-07-02
sortNumber: 406
path: "/articles/vue/407_number_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- NumberField

### コンポーネントレベル
- 原子（Atomic）

## ■ データ（data）

### 【reactive/ref】

### 【props】

### 【emit】

### 【computed】

## ■ イベント（events）

### 【update:number】
- 数値が変更されたときに発行されるイベント

## ■ コンピューテッド（computed）

### 【bindingClass】
- `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-number-field ${props.class}` をクラス名として返します。

## ■ 使用例（usecase）
```vue
<template>
  <NumberField
    id="example-number"
    class="example-number-field"
    style="background-color: #f0f0f0; border: 1px solid #ccc;"
    name="exampleNumber"
    :number="42"
    :min="0"
    :max="100"
    :isDisabled="false"
    :isReadonly="false"
    @update:number="handleNumberUpdate"
  />
</template>

<script setup>
import NumberField from '@/components/global/NumberField.vue'

const handleNumberUpdate = (updatedNumber) => {
  console.log('Updated number:', updatedNumber)
}
</script>

```

</nuxt-content-wrapper>