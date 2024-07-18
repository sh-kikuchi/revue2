---
title: 【revuekitz】FileField
description:
category: vue
createdAt: 2024-07-02
updatedAt: 2024-07-02
sortNumber: 404
path: "/articles/vue/404_file_field"
---

<nuxt-content-wrapper>

## ■ 概要（overview）
### コンポーネント名
- FileField

### コンポーネントレベル
- 原子（Atomic）

## ■ データ（data）

### 【reactive/ref】
- `preview` - ファイルのプレビュー情報を格納するリファレンス

## ■ プロパティ（props）

### 【id】
- 型: `String`
- デフォルト値: `''`
- ファイルフィールドのID

### 【class】
- 型: `String`
- デフォルト値: `''`
- ファイルフィールドのクラス

### 【name】
- 型: `String`
- デフォルト値: `''`
- ファイルフィールドの名前

### 【style】
- 型: `String`
- デフォルト値: `''`
- ファイルフィールドのスタイル

### 【styleReset】
- 型: `Boolean`
- デフォルト値: `false`
- スタイルリセットフラグ

### 【isDisabled】
- 型: `Boolean`
- デフォルト値: `false`
- ファイルフィールドの無効状態

### 【isReadonly】
- 型: `Boolean`
- デフォルト値: `false`
- ファイルフィールドの読み取り専用状態

## ■ イベント（events）

### 【fileData】
- ファイルが選択されたときに発行されるイベント

## ■ コンピューテッド（computed）

### 【bindingClass】
- `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-file-field ${props.class}` をクラス名として返します。

## ■ 使用例（usecase）
```vue
<template>
  <FileField
    id="file-field-file"
    class="file-field-file-field"
    style="background-color: #f0f0f0; border: 1px solid #ccc;"
    name="file-fieldFile"
    :isDisabled="false"
    :isReadonly="false"
    @fileData="handleFileData"
  />
</template>

<script setup>
import FileField from '@/components/global/FileField.vue'

const handleFileData = (file) => {
  console.log('Selected file:', file)
}
</script>

```

</nuxt-content-wrapper>