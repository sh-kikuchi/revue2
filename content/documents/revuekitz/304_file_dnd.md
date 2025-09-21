---
title: 【revuekitz】FileDnd
description: 
category: vue
createdAt: 2025-09-17
updatedAt: 2025-09-21
sortNumber: 304
path: "/documents/revuekitz/304_file_dnd"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="FileDnd"></revue-components>

## ■ 概要（overview）
### コンポーネント名
- FileDnd

### レベル (Atomic Design)
- Molecules（分子）

### カテゴリー（category）
- fields

## ■ データ（data）

### 【props】
- `modelValue` (File[]): ドラッグ＆ドロップまたは選択したファイルの配列を v-model で受け取る。
- `accept` (String, default: ''): 許可するファイルタイプ（例: `"image/*,.pdf"`）。
- `style` (String | Object, default: ''): カスタムスタイル。

### 【emit】
- `update:modelValue` (File[]): ファイル配列が変更されたときに発行される。

### 【refs】
- `dropAreaRef` (HTMLDivElement): ドロップ領域の参照。
- `fileInputRef` (HTMLInputElement): 内部 FileField の input 要素参照。

### 【watch】
- `modelValue` → `fileList` に反映
- `fileList` → `update:modelValue` を emit

### 【methods】
- `handleDrop(e: DragEvent)`：ファイルがドロップされたときに受け取って `fileList` にセット
- `handleDragOver(e: DragEvent)`：ドラッグオーバー時のスタイル変更
- `handleDragLeave(e: DragEvent)`：ドラッグ離脱時のスタイル変更
- `checkAccept(file: File, accept?: string)`：許可されたファイルタイプかチェック

## ■ 使用例（usecase）
```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FileDnd } from 'revuekitz'

const selectedFiles = ref<File[]>([])
</script>

<template>
  <section>
    <FileDnd
      v-model="selectedFiles"
      style="width: 400px;" 
      accept="image/*,.pdf,.docx"
      />
    <p v-if="selectedFiles.length > 0">
      Selected Files:
      <ul>
        <li v-for="(file, i) in selectedFiles" :key="i">
          {{ file.name }} ({{ (file.size / 1024).toFixed(1) }} KB)
        </li>
      </ul>
    </p>
  </section>
</template>
```