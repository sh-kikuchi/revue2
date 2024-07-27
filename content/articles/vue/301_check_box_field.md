---
title: 【revuekitz】CheckBoxField
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 301
path: "/articles/vue/301_check_box_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- CheckBoxField

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（category）
- fields

## ■ データ（data）

### 【reactive/ref】
- `itemChecked` (boolean) - チェックボックスの状態を保持
- `checkedItem` (string) - チェックされたアイテムの値

### 【props】
- `item` (string) - チェックボックスの値
- `id` (string) - チェックボックスのID
- `class` (string) - チェックボックスのクラス
- `name` (string) - チェックボックスの名前
- `style` (string) - チェックボックスのスタイル
- `styleReset` (boolean) - スタイルリセットフラグ
- `label` (string) - チェックボックスのラベル
- `type` (string) - チェックボックスのタイプ
- `isChecked` (boolean) - チェックボックスの初期チェック状態
- `isDisabled` (boolean) - チェックボックスの無効状態
- `isReadonly` (boolean) - チェックボックスの読み取り専用状態

### 【emit】
- `update:checked` - チェックボックスの状態が変更されたときに発行されるイベント

### 【computed】
- `bindingClass` - `styleReset`がtrueの場合は`props.class`、falseの場合は`revuekitz-check-box ${props.class}`をクラス名としてセットする

## ■ イベント（event）
- `update:checked` - チェックボックスの状態が変更されたときに発行されるイベント

## ■ 使用例（usecase）
```vue
<script setup>
import { ref } from 'vue'
import { CheckBoxField } from 'revuekitz'
import 'revuekitz/dist/style.css' 

const handleChecked = (value) => {
  console.log('Checked item:', value)
}
</script>

<template>
  <CheckBoxField
    id="checkBoxFieldId"
    class="check-box-field-class"
    style="color: red;"
    styleReset="false"
    name="check_box_field_name"
    item="check-box-field-item"
    label="check-box-field Label"
    type="checkbox"
    :isChecked="true"
    :isDisabled="false"
    :isReadonly="false"
    @update:checked="handleChecked"
  />
</template>

```

</nuxt-content-wrapper>