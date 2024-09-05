---
title: 【revuekitz】MoneyField
description: 
category: vue
createdAt: 2024-07-02
updatedAt: 2024-09-05
sortNumber: 305
path: "/articles/vue/305_money_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- MoneyField

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（category）
- fields

## ■ データ（data）

### 【props】
- `id` (string): 金額フィールドのID
- `class` (string): 金額フィールドのクラス
- `name` (string): 金額フィールドの名前
- `style` (string): 金額フィールドのスタイル
- `styleReset` (boolean): スタイルリセットフラグ
- `money` (number): 初期金額値
- `min` (number): 最小金額
- `max` (number): 最大金額
- `isDisabled` (boolean): 金額フィールドの無効状態
- `isReadonly` (boolean): 金額フィールドの読み取り専用状態

### 【emit】
- `update:val` - 金額が変更されたときに発行されるイベント

### 【computed】
- `bindingClass` - `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-money-field ${props.class}` をクラス名として返す

## ■ 使用例（usecase）
```vue
<script setup>
import { MoneyField } from 'revuekitz'
import 'revuekitz/dist/style.css' 

const moneyValue = ref(50)
</script>

<template>
  <MoneyField
    id="moneyFieldId"
    class="money-field-class"
    style="background-color: #f0f0f0; border: 1px solid #ccc;"
    name="money_field_name"
    :money="10000"
    :min="0"
    :max="100000"
    :isDisabled="false"
    :isReadonly="false"
    :money="moneyValue"
    v-model:val="moneyValue"
  />
</template>

```

</nuxt-content-wrapper>