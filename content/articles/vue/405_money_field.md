---
title: 【revuekitz】MoneyField
description: 
category: vue
createdAt: 2024-07-02
updatedAt: 2024-07-02
sortNumber: 405
path: "/articles/vue/405_money_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- MoneyField

### コンポーネントレベル
- 原子（Atomic）

## ■ データ（data）

### 【reactive/ref】

### 【props】

### 【emit】

### 【computed】

## ■ イベント（events）

### 【update:money】
- 金額が変更されたときに発行されるイベント

## ■ コンピューテッド（computed）

### 【bindingClass】
- `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-money-field ${props.class}` をクラス名として返します。

## ■ 使用例（usecase）
```vue
<template>
  <MoneyField
    id="example-money"
    class="example-money-field"
    style="background-color: #f0f0f0; border: 1px solid #ccc;"
    name="exampleMoney"
    :money="10000"
    :min="0"
    :max="100000"
    :isDisabled="false"
    :isReadonly="false"
    @update:money="handleMoneyUpdate"
  />
</template>

<script setup>
import MoneyField from '@/components/global/MoneyField.vue'

const handleMoneyUpdate = (updatedMoney) => {
  console.log('Updated money:', updatedMoney)
}
</script>

```

</nuxt-content-wrapper>