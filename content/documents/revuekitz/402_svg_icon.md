---
title: 【revuekitz】SvgIcon
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 402
path: "/documents/revuekitz/402_svg_icon"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- SvgIcon

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（Category）
- icons
## ■ データ（Data）

### 【props】
- `id` (string): 識別用のID
- `class` (string): クラス名
- `style` (string): インラインスタイル
- `path` (string): 表示するSVGアイコンのパス (必須)
- `size` (string): アイコンのサイズ ('128', '64', '32', '18' のいずれか、デフォルトは '64')


### 【computed】
- `bindingSize`: `props.size` に基づいてアイコンのサイズとスタイルを設定
- 
## ■ 依存関係（Dependency）
- @jamescoyle/vue-icon: SvgIconコンポーネントの使用
- @mdi/js: Material Design Iconsのアイコンパス

## ■ 使用例（Usecase）
```vue
<script setup>
import { mdiAccount } from '@mdi/js'
import { SvgIcon } from 'revuekitz'
import 'revuekitz/dist/style.css'
</script>

<template>
  <SvgIcon
    id="svgIconId"
    class="svg-icon--class"
    style="color: red;"
    :path="mdiAccount"
    size="64"
  />
</template>

```

</nuxt-content-wrapper>