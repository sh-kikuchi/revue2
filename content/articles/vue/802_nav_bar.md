---
title: 【revuekitz】NavBar
description: A customizable navigation bar component with visibility control and slot content.
category: vue
createdAt: 2024-07-03
updatedAt: 2024-07-03
sortNumber: 802
path: "/articles/vue/802_nav_bar"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- NavBar

### コンポーネントレベル
- 原子（Atom）

### カテゴリー（category）
- navigations

## ■ データ（Data）
### 【reactive/ref】
(なし)

### 【props】
- `isVisible` (Boolean, required): ナビゲーションバーの表示・非表示を制御するフラグです。デフォルトは `false` です。

### 【emit】
- `close`:ナビゲーションバーが閉じられたときに発火するイベント。

## ■ 依存関係（Dependency）
（なし）

## ■ 使用例（Usage Example）

```vue
<template>
  <NavBar :isVisible="navBarVisible" @close="navBarVisible = false">
    <img src="/path/to/logo.png" alt="Logo">
    <nav>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </NavBar>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/components/global/NavBar.vue'

const navBarVisible = ref(false)
</script>

```

</nuxt-content-wrapper>