---
title: 【revuekitz】LoadingLoader
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2025-08-11
sortNumber: 204
path: "/documents/revuekitz/204_loading_loader"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- LoadingLoader

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（Category）
- displays

## ■ データ（Data）

### 【reactive/ref】
- `loading` (boolean): ローディング状態 (Loading state)

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import { LoadingLoader } from 'revuekitz'
import 'revuekitz/dist/style.css' 
</script>

<template>
  <LoadingLoader>
    <span>Loading...</span>
  </LoadingLoader>
</template>

```

</nuxt-content-wrapper>