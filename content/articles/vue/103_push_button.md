---
title: 【revuekitz】プッシュボタン
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 103
path: "/articles/vue/103_push_button"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- プッシュボタン (Push Button)

### レベル (Atomic Design)
- 原子（Atomic）

### カテゴリー（Category）
- buttons

## ■ データ（Data）

### 【reactive/ref】
(なし)

### 【props】
- `id` (string)             - 要素のID
- `class` (string)          - 要素のクラス
- `name` (string)           - 要素の名前
- `type` (string)           - 要素のタイプ（`'button'` | `'reset'` | `'submit'`）
- `style` (string | object) - 要素のスタイル
- `styleReset` (boolean)    - スタイルリセットフラグ
- `isDisabled`(boolean)     - ボタンの有効化/無効化

### 【emit】
（なし）

### 【computed】
- bindingClass: `props.class`, `props.styleReset` の値に基づいてクラス名を設定 (Sets the class name based on `props.class` and `props.styleReset`)

## ■ イベント（Event）
（なし）

## ■ 依存関係（Dependency）
（なし）

## ■ 注意事項（Notice）
（なし）

## ■ 使用例（Usecase）
```vue
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

<script setup lang="ts">
import PushButton from './PushButton.vue'
</script>

```

</nuxt-content-wrapper>