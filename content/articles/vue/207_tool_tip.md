---
title: 【revuekitz】ToolTip
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 207
path: "/articles/vue/207_tool_tip"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- ToolTip

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（Category）
- displays

## ■ データ（Data）

### 【reactive/ref】
- `visible` (boolean): ツールチップの表示状態 (Whether the popup dialog is visible)

### 【props】
- `style` (string):ツールチップのコンテンツ部分のスタイル (Inline style of the dialog)

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import ToolTip from 'revuekitz'
</script>

<template>
  <ToolTip :style="'background-color: white;'">
    <template #toolTipBtn>
      <button>Open Popup</button>
    </template>
    <template #toolTipContent>
      <div>Content of the popup goes here.</div>
    </template>
  </ToolTip>
</template>

```

</nuxt-content-wrapper>