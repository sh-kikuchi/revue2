---
title: 【revuekitz】CardFlame
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 201
path: "/articles/vue/201_card_flame"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- CardFlame

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（Category）
- displays

## ■ データ（Data）

### 【props】
- `id` (string): カードのID
- `class` (string): カードのクラス名
- `name` (string): カードの名前
- `style` (string): カードのスタイル
- `styleReset` (boolean): クラス名をリセットするかどうか
- `title` (string): カードのタイトル
- `subtitle` (string): カードのサブタイトル

### 【computed】
- bindingClass: `props.class`, `props.styleReset` の値に基づいてクラス名を設定

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import { CardFlame } from '.revuekitz'
import 'revuekitz/dist/style.css' 
</script>

<template>
  <CardFlame
    id="cardFlameId"
    class="card-flame-class"
    :style="'background-color: lightgray;'"
    title="title"
    subtitle="subtitle"
  >
    <p>Enter the content of the card here.</p>
  </CardFlame>
</template>

```

</nuxt-content-wrapper>