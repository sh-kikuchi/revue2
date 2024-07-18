---
title: 【revuekitz】LayoutHeader
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 604
path: "/articles/vue/604_LayoutHeader"
---

## ■ 概要（Overview）
### コンポーネント名
- LayoutHeader

### レベル (Atomic Design)
- 原子（Atoms）

### カテゴリー（Category）
- レイアウト (Layout)

## ■ データ（Data）

### 【reactive/ref】
(なし)

### 【props】
- `id` (string) - ヘッダーのID
- `class` (string) - ヘッダーのクラス
- `style` (string) - ヘッダーのスタイル

### 【emit】
(なし)

### 【computed】
- bindingClass: props.classの値をベースにしたクラス名

## ■ イベント（Event）
(なし)

## ■ 依存関係（Dependency）
(なし)

## ■ 使用例（Usecase）
```vue
<template>
  <LayoutHeader id="custom-header" class="custom-header-class" style="margin-bottom: 20px;">
    <h1>My Website</h1>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </LayoutHeader>
</template>

<script setup lang="ts">
import LayoutHeader from './LayoutHeader.vue'
</script>

```