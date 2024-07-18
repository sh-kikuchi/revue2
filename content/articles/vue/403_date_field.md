---
title: 【revuekitz】DateField
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 403
path: "/articles/vue/403_date_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- DateField

### コンポーネントレベル
- 原子（Atomic）

## ■ データ（data）

### 【reactive/ref】
特になし

### 【props】
- `id` (string) - 日付フィールドのID
- `class` (string) - 日付フィールドのクラス
- `name` (string) - 日付フィールドの名前
- `style` (string) - 日付フィールドのスタイル
- `styleReset` (boolean) - スタイルリセットフラグ
- `type` (string) - 入力フィールドのタイプ (デフォルトは 'date')
- `dateValue` (string) - 初期日付値
- `minlength` (string|number) - 最小入力長
- `maxlength` (string|number) - 最大入力長
- `isDisabled` (boolean) - 入力フィールドの無効状態
- `isReadonly` (boolean) - 入力フィールドの読み取り専用状態

### 【emit】
- `update:dateValue` - 日付フィールドの値が変更されたときに発行されるイベント

### 【computed】
- `bindingClass` - `styleReset`がtrueの場合は`props.class`、falseの場合は`revuekitz-date-field ${props.class}`をクラス名としてセットする

## ■ イベント（event）
- `update:dateValue` - 日付フィールドの値が変更されたときに発行されるイベント

## ■ 依存関係（dependency）
特になし

## ■ 注意事項（notice）
特になし

## ■ 使用例（usecase）
```vue
<template>
  <DateField
    id="dateFieldId"
    class="date-field-class"
    style="border: 1px solid black;"
    styleReset="false"
    name="date_field_name"
    dateValue="2024-07-01"
    minlength="5"
    maxlength="10"
    :isDisabled="false"
    :isReadonly="false"
    @update:dateValue="handleDateChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import DateField from '@/components/global/DateField.vue'

const handleDateChange = (date) => {
  console.log('Selected date:', date)
}
</script>

```

</nuxt-content-wrapper>