---
title: 【revuekitz】ChipText
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 301
path: "/articles/vue/302_chip_text"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- ChipText

### レベル (Atomic Design)
- 原子（Atomic）

### カテゴリー（Category）
- displays

## ■ データ（Data）

### 【reactive/ref】
(なし)

### 【props】
- `id` (string): ルート要素のID
- `class` (string): ルート要素のクラス名
- `style` (string): ルート要素のスタイル
- `styleReset` (boolean): クラスをリセットするかどうか

### 【emit】
（なし）

### 【computed】
- bindingClass: `props.class`, `props.styleReset` の値に基づいてクラス名を設定

## ■ イベント（Event）
（なし）

## ■ 依存関係（Dependency）
（なし）

## ■ 使用例（Usecase）
```vue
<template>
  <ChipText
    id="chipTextId"
    class="chip-text-class"
    :style="'background-color: lightgray;'"
    :styleReset="false"
  >
    <span>チップの内容</span>
  </ChipText>
</template>

<script setup lang="ts">
import ChipText from './ChipText.vue'
</script>

```

</nuxt-content-wrapper>
