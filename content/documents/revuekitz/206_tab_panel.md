---
title: 【revuekitz】TabPanel
description: 
category: vue
createdAt: 2024-07-03
updatedAt: 2024-07-03
sortNumber: 206
path: "/documents/revuekitz/206_tab_panel"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- TabPanel

### レベル (Atomic Design)
- 原子（Atom）

### カテゴリー（category）
- displays

## ■ データ（Data）

### 【props】

- `style` (String | Object, default: ''): インラインスタイルを指定します。
- `count` (Number, default: 2): タブの数を指定します。
- `tabs` (Array, default: () => ['apple', 'banana']): 表示するタブの名前の配列です。
- `color` (String, default: '#fff'): アクティブタブの文字色を指定します。
- `backgroundColor` (String, default: '#00a968'): アクティブタブの背景色を指定します。

## ■ 使用例（Usage Example）

```vue
<script setup lang="ts">
import { TabPanel } from './TabPanel.vue'
import 'revuekitz/dist/style.css' 
</script>

<template>
  <TabPanel 
    :tabs="['Tab 1', 'Tab 2', 'Tab 3']" 
    :count="3" 
    :style="{ margin: '20px' }" 
    color="#fff" 
    backgroundColor="#00a968"
  >
    <template #content0>
      <div>Content for Tab 1</div>
    </template>
    <template #content1>
      <div>Content for Tab 2</div>
    </template>
    <template #content2>
      <div>Content for Tab 3</div>
    </template>
  </TabPanel>
</template>

```

</nuxt-content-wrapper>