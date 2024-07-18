---
title: 【revuekitz】ImgIcon
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 501
path: "/articles/vue/501_img_icon"
---

## ■ 概要（Overview）
### コンポーネント名
- ImgIcon

### レベル (Atomic Design)
- 原子（Atomic）

### カテゴリー（Category）
- Icons

## ■ データ（Data）

### 【reactive/ref】

### 【props】
- `id` (string): 識別用のID
- `class` (string): クラス名
- `style` (string): インラインスタイル
- `imgFile` (string): 表示する画像のファイルパス
- `size` (string): アイコンのサイズ ('128', '64', '32', '18' のいずれか、デフォルトは '64')
- `alt` (string): 画像の代替テキスト

### 【emit】

### 【computed】
- `bindingSize`: `props.size` に基づいてアイコンのサイズとスタイルを設定

## ■ イベント（Event）
(なし)

## ■ 依存関係（Dependency）
(なし)

## ■ 使用例（Usecase）
```vue
<template>
  <ImgIcon
    id="imgIconId"
    class="img-icon-class"
    style="border: 2px solid #000;"
    imgFile="path/to/image.png"
    size="128"
    alt="Example Image"
  />
</template>

<script setup lang="ts">
import ImgIcon from './ImgIcon.vue'
</script>

```