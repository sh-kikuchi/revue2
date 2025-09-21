---
title: 【revuekitz】ImgIcon
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2025-09-21
sortNumber: 401
path: "/documents/revuekitz/401_img_icon"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="ImgIcon"></revue-components>

## ■ 概要（Overview）
### コンポーネント名
- ImgIcon

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（Category）
- Icons

## ■ データ（Data）

### 【props】
- `id` (string): 識別用のID
- `class` (string): クラス名
- `style` (string): インラインスタイル
- `path` (string): 表示する画像のファイルパス
- `size` (string): アイコンのサイズ ('128', '64', '32', '18' のいずれか、デフォルトは '64')
- `alt` (string): 画像の代替テキスト

### 【computed】
- `bindingSize`: `props.size` に基づいてアイコンのサイズとスタイルを設定

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import { ImgIcon } from 'revuekitz'
import 'revuekitz/dist/style.css'
</script>

<template>
  <ImgIcon
    id="imgIconId"
    class="img-icon-class"
    style="border: 2px solid #000;"
    path="path/to/image.png"
    size="128"
    alt="Example Image"
  />
</template>

```

</nuxt-content-wrapper>