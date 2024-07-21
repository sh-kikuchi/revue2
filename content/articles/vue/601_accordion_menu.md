---
title: 【revuekitz】AccordionMenu
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 601
path: "/articles/vue/601_accordion_menu"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- AccordionMenu

### レベル (Atomic Design)
- 原子（Atoms）

### カテゴリー（Category）
- lists

## ■ データ（Data）

### 【reactive/ref】
- `block`: 現在開いているリストの状態を保持するオブジェクト。

### 【props】
- `id` (string) - アコーディオンのID。
- `class` (string) - アコーディオンのクラス。
- `style` (string) - アコーディオンのスタイル。
- `styleReset` (boolean) - スタイルリセットフラグ。
- `lists` (Array<List>) - アコーディオンのリストデータ。各リストは`title`と`items`を持つ。

## ■ イベント（Event）
- `beforeEnter(el: HTMLElement)`: 要素が表示される前に呼ばれ、透明度を0に設定します。
- `open(value: string)`: 特定のリストを開閉するための関数。すでに開いている場合は閉じます。
- `enter(el: HTMLElement, done: () => void)`: 要素が表示されるときに呼ばれ、透明度を1にアニメーションします。
- `leave(el: HTMLElement, done: () => void)`: 要素が非表示になるときに呼ばれ、透明度を0にアニメーションします。

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import AccordionMenu from 'revuekitz'
</script>

<template>
  <AccordionMenu
    id="accordionMenuId"
    class="accordion-menu--class"
    :style="backgroundColor: 'lightgray'"
    :styleReset="false"
    :lists="[
      { title: 'リスト1', items: ['aaa', 'bbb', 'ccc'] },
      { title: 'リスト2', items: ['aaa', 'bbb', 'ccc'] }
    ]"
  />
</template>

```
</nuxt-content-wrapper>