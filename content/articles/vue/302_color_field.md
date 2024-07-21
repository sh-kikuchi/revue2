---
title: 【revuekitz】ColorField
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 302
path: "/articles/vue/302_color_field"
---

<nuxt-content-wrapper>

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
- `selectedColor` (string) - 初期選択色

### 【emit】
- `update:selectedColor` - カラーフィールドの色が変更されたときに発行されるイベント

### 【computed】
- `bindingClass` - `styleReset`がtrueの場合は`props.class`、falseの場合は`revuekitz-color-field ${props.class}`をクラス名としてセットする

## ■ イベント（event）
- `update:selectedColor` - カラーフィールドの色が変更されたときに発行されるイベント

## ■ 使用例（usecase）
```vue
<script setup>
import { ref } from 'vue'
import ColorField from 'revuekitz'

const handleColorChange = (color) => {
  console.log('Selected color:', color)
}
</script>

<template>
  <ColorField
    id="colorFieldId"
    class="color-field-class"
    style="border: 1px solid black;"
    styleReset="false"
    name="color_field_name"
    @update:selected-color="handleColorChange"
  />
</template>

```

</nuxt-content-wrapper>