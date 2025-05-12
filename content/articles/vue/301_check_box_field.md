---
title: 【revuekitz】CheckBoxField
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-09-05
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
- `update:modelvalue` - 子で変更されたチェック状態に応じて値を親に渡す
- `update:checked` - 子で変更されたチェック状態（真偽値）を親に渡す

### 【computed】
- `bindingClass` - `styleReset`がtrueの場合は`props.class`、falseの場合は`revuekitz-check-box ${props.class}`をクラス名としてセットする


## ■ 使用例（usecase）
```vue
<script setup>
import { ref } from 'vue'
import { CheckBoxField } from 'revuekitz'
import 'revuekitz/dist/style.css' 

const checkedItem = ref('')
const checkBoxChecked = ref(false)

</script>

<template>
   <CheckBoxField
      id="checkBoxFieldId"
      class="check-box-field-class"
      style="color: red"
      :styleReset="false"
      name="check_box_field_name"
      label="check-box-field Label"
      type="checkbox"
      :isDisabled="false"
      :isReadonly="false"
      item="check-box-field-item"
      v-model="checkedItem"
    />
</template>

```

</nuxt-content-wrapper>