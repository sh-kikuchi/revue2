---
title: 【revuekitz】NavBar
description: 
category: vue
createdAt: 2024-07-03
updatedAt: 2024-07-03
sortNumber: 506
path: "/documents/revuekitz/506_nav_bar"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- NavBar

### レベル (Atomic Design)
- 原子（Atom）

### カテゴリー（category）
- navigations

## ■ データ（Data）

### 【props】
- `isVisible` (Boolean, required): ナビゲーションバーの表示・非表示を制御するフラグです。デフォルトは `false` です。

### 【emit】
- `close`:ナビゲーションバーが閉じられたときに発火するイベント。

## ■ 使用例（Usage Example）

```vue
<script setup>
import { ref } from 'vue'
import { NavBar } from 'revuekitz'

const navBarVisible = ref(false)
</script>

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

```

</nuxt-content-wrapper>