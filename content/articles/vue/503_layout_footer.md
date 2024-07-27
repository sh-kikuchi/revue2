---
title: 【revuekitz】LayoutFooter
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 503
path: "/articles/vue/503_layout_footer"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- LayoutFooter

### レベル (Atomic Design)
- 原子（Atoms）

### カテゴリー（Category）
- layouts

## ■ 使用例（Usecase）
```vue
<template>
<script setup lang="ts">
import { LayoutFooter } from 'revuekitz'
import 'revuekitz/dist/style.css' 
</script>

  <LayoutFooter id="custom-footer" class="custom-footer-class" style="padding: 10px;" :styleReset="false">
    <div>Footer Content</div>
  </LayoutFooter>
</template>

```

<nuxt-content-wrapper>