---
title: 【revuekitz】LayoutHeader
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 504
path: "/documents/revuekitz/504_layout_header"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- LayoutHeader

### レベル (Atomic Design)
- 原子（Atoms）

### カテゴリー（Category）
- layouts

## ■ データ（Data）

### 【props】
- `id` (string) - ヘッダーのID
- `class` (string) - ヘッダーのクラス
- `style` (string) - ヘッダーのスタイル

### 【computed】
- bindingClass: props.classの値をベースにしたクラス名

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import { LayoutHeader } from 'revuekitz'
import 'revuekitz/dist/style.css' 
</script>

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

```

</nuxt-content-wrapper>