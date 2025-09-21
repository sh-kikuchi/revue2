---
title: 【revuekitz】FileField
description:
category: vue
createdAt: 2024-07-02
updatedAt: 2025-09-21
sortNumber: 305
path: "/documents/revuekitz/305_file_field"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="FileField"></revue-components>

## ■ 概要（overview）
### コンポーネント名
- FileField

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（category）
- fields

## ■ データ（data）

### 【reactive/ref】
- `preview` - 選択したファイル情報を格納する。（emitでデータを渡せるので、プレビューなどに活用可）

### 【props】
- `id` (string): ファイルフィールドのID
- `class` (string): ファイルフィールドのクラス
- `name` (string): ファイルフィールドの名前
- `style` (string): ファイルフィールドのスタイル
- `styleReset` (boolean): スタイルリセットフラグ
- `isDisabled` (boolean): ファイルフィールドの無効状態
- `isReadonly` (boolean): ファイルフィールドの読み取り専用状態
- `accept` (String, default: ''): 許可するファイルタイプ（例: `"image/*,.pdf"`）。

### 【emit】
- `update:moneyValue` - 日付フィールドの値が変更されたときに発行されるイベント

### 【computed】
- `bindingClass` - `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-file-field ${props.class}` をクラス名として返す

## ■ 使用例（usecase）
```vue
<script setup>
import { FileField } from 'revuekitz'
import 'revuekitz/dist/style.css' 

const fileData = ref<File[]>([])

</script>

<template>
  <section>
    <h3>FileField</h3>
    <div style="margin-top: 15px; margin-bottom: 15px">
      <FileField v-model="fileData" malpiple="true" accept="image/*,.pdf,.docx">Files</FileField>
    </div>
    <div>
      <ul>
        <li v-for="file in fileData" :key="file.name">
          {{ file.name }} ({{ file.size }} bytes)
        </li>
      </ul>
    </div>
  </section>
</template>

```

</nuxt-content-wrapper>