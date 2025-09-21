---
title: 【revuekitz】ColorField
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2025-09-21
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
- `selectedColor` (string) - 初期選択色

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
    v-model="selectedColor"
  />
</template>

```

</nuxt-content-wrapper>