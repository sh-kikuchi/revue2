---
title: 【revuekitz】BasicButton
description: 
category: vue
createdAt: 2024-03-16
updatedAt: 2024-03-16
sortNumber: 101
path: "/articles/vue/101_basic_button"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- BasicButton

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（category）
- buttons

## ■ データ（data）

### 【props】
- `id` (string) - 要素のID
- `class` (string) - 要素のクラス
- `style` (string | object) - 要素のスタイル
- `styleReset` (boolean) - スタイルリセットフラグ
- `name` (string) - 要素の名前
- `type` (string) - 要素のタイプ（`'button'` | `'reset'` | `'submit'`）
- `isDisabled`(boolean)- 要素の有効化/無効化

### 【emit】

### 【computed】
- bindingClass: `props.class`, `props.styleReset` の値に基づいてクラス名を設定 (Sets the class name based on `props.class` and `props.styleReset`)

## ■ 使用例（usecase）
```vue
<script setup lang="ts">
import { BasicButton } from 'revuekitz'
import 'revuekitz/dist/style.css' 
</script>

<template>
  <div>
    <!-- BasicButtonの使用例 -->
    <BasicButton
      id="basicButtonId"
      class="basic-button-class"
      name="basic_button_name"
      type="submit"
      :style="{ color: 'white', backgroundColor: 'blue' }"
      :styleReset="false"
      :isDisabled="false"
    >
      BasicButton
    </BasicButton>
  </div>
</template>



```

</nuxt-content-wrapper>