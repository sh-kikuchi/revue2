---
title: 【revuekitz】ColorField
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2026-10-10
sortNumber: 302
path: "/documents/revuekitz/302_color_field"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="ColorField"></revue-components>

## ■ 概要（overview）
### コンポーネント名
- ColorField

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（category）
- fields

## ■ データ（data）

### 【reactive/ref】
- `selectedColor` (string) - 選択された色

### 【props】
- `id` (string) - カラーフィールドのID
- `class` (string) - カラーフィールドのクラス
- `name` (string) - カラーフィールドの名前
- `style` (string) - カラーフィールドのスタイル
- `styleReset` (boolean) - スタイルリセットフラグ
- `modelValue` (string) - 初期選択色
- `isDisabled` (boolean, default: false) - カラーフィールドの無効状態
- `isReadonly` (boolean, default: false) - カラーフィールドの読み取り専用状態

### 【emit】
- `update:modelValue` - カラーフィールドの色が変更されたときに発行されるイベント

### 【computed】
- `bindingClass` - `styleReset`がtrueの場合は`props.class`、falseの場合は`revuekitz-color-field ${props.class}`をクラス名としてセットする

## ■ 使用例（usecase）
```vue
<script setup>
import { ref } from 'vue'
import { ColorField } from 'revuekitz'
import 'revuekitz/dist/style.css' 

const selectedColor = ref('')
</script>

<template>
   <ColorField
    id="colorFieldId"
    class="color-field-class"
    style="border: 1px solid black"
    :styleReset="false"
    name="color_field_name"
    :isDisabled="false"
    :isReadonly="false"
    v-model="selectedColor"
  />
</template>

```

</nuxt-content-wrapper>
