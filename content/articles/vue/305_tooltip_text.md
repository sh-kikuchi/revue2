---
title: 【revuekitz】TooltipText
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 305
path: "/articles/vue/305_tooltip_text"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- TooltipText

### レベル (Atomic Design)
- 原子（Atomic）

### カテゴリー（Category）
- テキスト (Text)

## ■ データ（Data）

### 【reactive/ref】
(なし)

### 【props】
- tooltipPosition (string): ツールチップの位置 ('top', 'bottom', 'left', 'right' のいずれか、デフォルトは 'top')
- tooltipContent (string): ツールチップの内容

### 【emit】
（なし）

### 【computed】
（なし）

## ■ イベント（Event）
（なし）

## ■ 依存関係（Dependency）
（なし）

## ■ 使用例（Usecase）
```vue
<template>
  <TooltipText tooltipPosition="top" tooltipContent="これはツールチップです">
    <button>hover</button>
  </TooltipText>
</template>

<script setup lang="ts">
import TooltipText from './TooltipText.vue'
</script>

```

</nuxt-content-wrapper>