---
title: 【revuekitz】ポップアップダイアログ
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 005
path: "/articles/vue/202_popup_dialog"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- ポップアップダイアログ (Popup Dialog)

### レベル (Atomic Design)
- 原子（Atomic）

### カテゴリー（Category）
- dialogs

## ■ データ（Data）

### 【reactive/ref】
- `visible` (boolean): ポップアップダイアログの表示状態 (Whether the popup dialog is visible)

### 【props】
- `style` (string):ダイアログのコンテンツ部分のスタイル (Inline style of the dialog)

### 【emit】
(なし)

### 【computed】
（なし）

## ■ イベント（Event）
（なし）

## ■ 依存関係（Dependency）
（なし）

## ■ 使用例（Usecase）
```vue
<template>
  <PopupDialog :style="'background-color: white;'">
    <template #popupBtn>
      <button>Open Popup</button>
    </template>
    <template #popupContent>
      <div>Content of the popup goes here.</div>
    </template>
  </PopupDialog>
</template>

<script setup lang="ts">
import PopupDialog from './PopupDialog.vue'
</script>

```

</nuxt-content-wrapper>