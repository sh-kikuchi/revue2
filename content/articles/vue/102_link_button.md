---
title: 【revuekitz】リンク付きボタン
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 102
path: "/articles/vue/102_link_button"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- リンクボタン (Linked Button)

### レベル (Atomic Design)
- 原子（Atomic）

### カテゴリー（Category）
- buttons

## ■ データ（Data）

### 【reactive/ref】
（なし）

### 【props】
- `id` (string): 要素のID
- `class` (string): 要素のクラス
- `name` (string): 要素の名前
- `style` (string | object) : 要素のスタイル
- `styleReset` (boolean): スタイルリセットフラグ
- `href` (string): 要素のリンク先URL
- `isDisabled`(boolean): ボタンの有効化/無効化

### 【emit】
(なし)

### 【computed】
- bindingClass: `props.class`, `props.styleReset` の値に基づいてクラス名を設定 (Sets the class name based on `props.class` and `props.styleReset`)

## ■ イベント（Event）
(なし)

## ■ 依存関係（Dependency）
(なし)

## ■ 使用例（Usecase）
```vue
<template>
  <div>
    <!-- LinkButtonの使用例 -->
    <LinkButton
      id="linkButtonId"
      class="link-button-class"
      name="link_button_name"
      href="https://www.example.com"
      :style="{ backgroundColor: 'blue' }"
      :styleReset="false"
      :isDisabled="true"
    >
      Click Me
    </LinkButton>
  </div>
</template>

<script setup lang="ts">
import LinkButton from './LinkButton.vue'
</script>

```

</nuxt-content-wrapper>