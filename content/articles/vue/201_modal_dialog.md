---
title: 【revuekitz】モーダルダイアログ
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 201
path: "/articles/vue/201_modal_dialog"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- モーダルダイアログ (Modal Dialog)

### レベル (Atomic Design)
- 原子（Atomic）

### カテゴリー（Category）
- dialogs

## ■ データ（Data）

### 【reactive/ref】
(なし)

### 【props】
- `isVisible` (boolean): ダイアログの表示状態 (Whether the dialog is visible)
- `id` (string): ダイアログのコンテンツ部分のID (Dialog ID)
- `class` (string): ダイアログのコンテンツ部分のクラス名 (Class name of the dialog)
- `style` (string):ダイアログのコンテンツ部分のスタイル (Inline style of the dialog)

### 【emit】
- close: ダイアログを閉じるときに発火するイベント (Event fired when closing the dialog)

### 【computed】
- bindingClass: `props.class` の値を含むクラス名 (Class name including `props.class`)

## ■ イベント（Event）
（なし）

## ■ 依存関係（Dependency）
（なし）

## ■ 使用例（Usecase）
```vue
<template>
  <ModalDialog
    id="modal-dialog-id"
    class="modal-dialog-class"
    :style="{ border: '2px solid blue' }"
    :isVisible="false"
  >
    <p>Display modal content here</p>
  </ModalDialog>
</template>

<script setup lang="ts">
import ModalDialog from './ModalDialog.vue'
</script>

```

</nuxt-content-wrapper>