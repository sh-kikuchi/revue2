---
title: 【revuekitz】ToolTip
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2026-09-15
sortNumber: 208
path: "/documents/revuekitz/208_tool_tip"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="ToolTip"></revue-components>

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
- `position` (string): ツールチップの表示位置（`'top'` | `'bottom'` | `'left'` | `'right'`、デフォルト: `'right'`）

### 【computed】
- `tooltipPositionClass`: `props.position` の値に基づいて表示位置のクラス名を設定

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import { ToolTip } from 'revuekitz'
import 'revuekitz/dist/style.css' 
</script>

<template>
  <ToolTip>
    <template v-slot:toolTipBtn>
      <div><button>TEST</button></div>
    </template>
    <template v-slot:toolTipContent>
      <div class="pa-2">TESTMAN</div>
    </template>
  </ToolTip>
</template>

```

</nuxt-content-wrapper>
