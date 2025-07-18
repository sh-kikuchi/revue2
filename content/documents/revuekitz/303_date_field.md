---
title: 【revuekitz】DateField
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-09-05
sortNumber: 303
path: "/documents/revuekitz/303_date_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- DateField

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（category）
- fields

## ■ データ（data）

### 【props】
- `id` (string) : 日付フィールドのID
- `class` (string) : 日付フィールドのクラス
- `name` (string) : 日付フィールドの名前
- `style` (string) : 日付フィールドのスタイル
- `styleReset` (boolean) : スタイルリセットフラグ
- `type` (string) : 入力フィールドのタイプ (デフォルトは 'date')
- `minlength` (string|number) - 最小入力長
- `maxlength` (string|number) - 最大入力長
- `isDisabled` (boolean) - 入力フィールドの無効状態
- `isReadonly` (boolean) - 入力フィールドの読み取り専用状態

### 【emit】
- `update:modelValue` - 日付フィールドの値が変更されたときに発行されるイベント

### 【computed】
- `bindingClass` - `styleReset`がtrueの場合は`props.class`、falseの場合は`revuekitz-date-field ${props.class}`をクラス名としてセットする

## ■ 使用例（usecase）
```vue
<script setup>
import { ref } from 'vue'
import { DateField } from 'revuekitz'
import 'revuekitz/dist/style.css' 

const dateValue = ref('')

<template>
  <DateField
    type="date"
    id="dateFieldId"
    class="date-field-class"
    style="border: 1px solid black"
    :styleReset="false"
    name="date_field_name"
    minlength="2024-07-01"
    maxlength="2024-07-26"
    :isDisabled="false"
    :isReadonly="false"
    v-model="dateValue"
  />
</template>


</script>

```

</nuxt-content-wrapper>