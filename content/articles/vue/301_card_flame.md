---
title: 【revuekitz】CardFlame
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 301
path: "/articles/vue/301_card_flame"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- CardFlame

### レベル (Atomic Design)
- 原子（Atomic）

### カテゴリー（Category）
- displays

## ■ データ（Data）

### 【reactive/ref】
(なし)

### 【props】
- `id` (string): カードのID
- `class` (string): カードのクラス名
- `name` (string): カードの名前
- `style` (string): カードのスタイル
- `styleReset` (boolean): クラス名をリセットするかどうか
- `title` (string): カードのタイトル
- `subtitle` (string): カードのサブタイトル

### 【emit】

### 【computed】
- bindingClass: `props.class`, `props.styleReset` の値に基づいてクラス名を設定

## ■ イベント（Event）

## ■ 依存関係（Dependency）

## ■ 注意事項（Notice）

## ■ 使用例（Usecase）
```vue
<template>
  <CardFlame
    id="cardFlameId"
    class="card-flame-class"
    :style="'background-color: lightgray;'"
    title="カードタイトル"
    subtitle="カードサブタイトル"
  >
    <p>カードの内容をここに記載します。</p>
  </CardFlame>
</template>

<script setup lang="ts">
import CardFlame from './CardFlame.vue'
</script>
```

</nuxt-content-wrapper>