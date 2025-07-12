---
title: 【revuekitz】PushButton
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 103
path: "/documents/revuekitz/103_push_button"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- PushButton

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（Category）
- buttons

## ■ データ（Data）

### 【props】
- `id` (string)             - 要素のID
- `class` (string)          - 要素のクラス
- `name` (string)           - 要素の名前
- `type` (string)           - 要素のタイプ（`'button'` | `'reset'` | `'submit'`）
- `style` (string | object) - 要素のスタイル
- `styleReset` (boolean)    - スタイルリセットフラグ
- `isDisabled`(boolean)     - ボタンの有効化/無効化

### 【computed】
- bindingClass: `props.class`, `props.styleReset` の値に基づいてクラス名を設定 (Sets the class name based on `props.class` and `props.styleReset`)

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import { PushButton } from 'revuekitz'
import 'revuekitz/dist/style.css' 
</script>

<template>
  <div>
    <!-- PushButtonの使用例 -->
    <PushButton
      id="pushButtonId"
      class="push-button-class"
      name="push_button_name"
      :style="{ backgroundColor: 'aqua' }"
      :styleReset="false"
      :isDisabled="false"
    >
      PushButton
    </PushButton>
  </div>
</template>

```

</nuxt-content-wrapper>