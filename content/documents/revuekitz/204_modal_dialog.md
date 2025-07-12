---
title: 【revuekitz】ModalDialog
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-12
sortNumber: 204
path: "/documents/revuekitz/204_modal_dialog"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- ModalDialog
  
### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（Category）
- displays

## ■ データ（Data）

### 【props】
- `isVisible` (boolean): ダイアログの表示状態 (Whether the dialog is visible)
- `id` (string): ダイアログのコンテンツ部分のID (Dialog ID)
- `class` (string): ダイアログのコンテンツ部分のクラス名 (Class name of the dialog)
- `style` (string):ダイアログのコンテンツ部分のスタイル (Inline style of the dialog)

### 【emit】
- close: ダイアログを閉じるときに発火するイベント (Event fired when closing the dialog)

### 【computed】
- bindingClass: `props.class` の値を含むクラス名 (Class name including `props.class`)

## ■ 使用例（Usecase）

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ModalDialog } from 'revuekitz'
import 'revuekitz/dist/style.css' 
const isModalVisible = ref(false)

const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value
}

const closeModal = () => {
  isModalVisible.value = false
}
</script>

<template>
  <ModalDialog
    id="modal-dialog-id"
    class="modal-dialog-class"
    :style="{ border: '2px solid blue' }"
    :is-visible="isModalVisible" 
    @close="closeModal"
  >
    <p>Display modal content here</p>
  </ModalDialog>
</template>

```

</nuxt-content-wrapper>