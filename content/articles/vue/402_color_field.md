---
title: 【revuekitz】ColorField
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 402
path: "/articles/vue/402_color_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- ColorField

### コンポーネントレベル
- 原子（Atomic）

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

## ■ 依存関係（dependency）
特になし

## ■ 注意事項（notice）
特になし

## ■ 使用例（usecase）
```vue
<template>
  <ColorField
    id="colorFieldId"
    class="color-field-class"
    style="border: 1px solid black;"
    styleReset="false"
    name="color_field_name"
    selectedColor="#ff0000"
    @update:selectedColor="handleColorChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import ColorField from '@/components/global/ColorField.vue'

const handleColorChange = (color) => {
  console.log('Selected color:', color)
}
</script>

```

</nuxt-content-wrapper>