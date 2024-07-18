---
title: 【revuekitz】LayoutFooter
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 603
path: "/articles/vue/603_LayoutFooter"
---

## ■ 概要（Overview）
### コンポーネント名
- LayoutFooter

### レベル (Atomic Design)
- 原子（Atoms）

### カテゴリー（Category）
- layouts

## ■ データ（Data）

### 【reactive/ref】
(なし)

### 【props】
(なし)

### 【emit】
(なし)

### 【computed】
(なし)

## ■ イベント（Event）
(なし)

## ■ 依存関係（Dependency）
(なし)

## ■ 使用例（Usecase）
```vue
<template>
  <LayoutFooter id="custom-footer" class="custom-footer-class" style="padding: 10px;" :styleReset="false">
    <div>Footer Content</div>
  </LayoutFooter>
</template>

<script setup lang="ts">
import LayoutFooter from './LayoutFooter.vue'
</script>
```
