---
title: 【revuekitz】ChipText
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 202
path: "/documents/revuekitz/202_chip_text"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- ChipText

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（Category）
- displays

## ■ データ（Data）

### 【props】
- `id` (string): ルート要素のID
- `class` (string): ルート要素のクラス名
- `style` (string): ルート要素のスタイル
- `styleReset` (boolean): クラスをリセットするかどうか

### 【computed】
- bindingClass: `props.class`, `props.styleReset` の値に基づいてクラス名を設定

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import { ChipText } from 'revuekitz'
import 'revuekitz/dist/style.css' 
</script>

<template>
  <ChipText
    id="chipTextId"
    class="chip-text-class"
    :style="'background-color: lightgray;'"
    :styleReset="false"
  >
    <span>Vue.js</span>
  </ChipText>
</template>

```

</nuxt-content-wrapper>
