---
title: 【revuekitz】SvgIcon
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 013
path: "/articles/vue/502_svg_icon"
---

## ■ 概要（Overview）
### コンポーネント名
- SvgIcon

### レベル (Atomic Design)
- 原子（Atomic）

### カテゴリー（Category）
- icons
## ■ データ（Data）
### 【reactive/ref】
（なし）

### 【props】
- `id` (string): 識別用のID
- `class` (string): クラス名
- `style` (string): インラインスタイル
- `path` (string): 表示するSVGアイコンのパス (必須)
- `size` (string): アイコンのサイズ ('128', '64', '32', '18' のいずれか、デフォルトは '64')

### 【emit】
(なし)

### 【computed】
- `bindingSize`: `props.size` に基づいてアイコンのサイズとスタイルを設定

## ■ イベント（Event）
(なし)

## ■ 依存関係（Dependency）
- @jamescoyle/vue-icon: SvgIconコンポーネントの使用
- @mdi/js: Material Design Iconsのアイコンパス

## ■ 使用例（Usecase）
```vue
<template>
  <SvgIcon
    id="icon-1"
    class="custom-class"
    style="color: red;"
    :path="mdiAccount"
    size="64"
  />
</template>

<script setup>
import { mdiAccount } from '@mdi/js'
import IconComponent from './IconComponent.vue'
</script>
```