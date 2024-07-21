---
title: 【revuekitz】FileField
description:
category: vue
createdAt: 2024-07-02
updatedAt: 2024-07-02
sortNumber: 304
path: "/articles/vue/304_file_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- FileField

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（category）
- fields

## ■ データ（data）

### 【reactive/ref】
- `preview` - ファイルのプレビュー情報を格納するリファレンス

### 【props】
- `id` (string): ファイルフィールドのID
- `class` (string): ファイルフィールドのクラス
- `name` (string): ファイルフィールドの名前
- `style` (string): ファイルフィールドのスタイル
- `styleReset` (boolean): スタイルリセットフラグ
- `isDisabled` (boolean): ファイルフィールドの無効状態
- `isReadonly` (boolean): ファイルフィールドの読み取り専用状態

### 【events】
- `fileData` - ファイルが選択されたときに発行されるイベント

### 【computed】
- `bindingClass` - `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-file-field ${props.class}` をクラス名として返す

## ■ 使用例（usecase）
```vue
<script setup>
import FileField from 'revuekitz'

const handleFileData = (file) => {
  console.log('Selected file:', file)
}
</script>

<template>
  <FileField
    id="fileFieldId"
    class="file-field-class"
    style="background-color: #f0f0f0; border: 1px solid #ccc;"
    name="file_field_name"
    :isDisabled="false"
    :isReadonly="false"
    @fileData="handleFileData"
  />
</template>

```

</nuxt-content-wrapper>