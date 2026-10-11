---
title: 【revuekitz】MultiLineField
description:
category: vue
createdAt: 2024-07-02
updatedAt: 2026-10-10
sortNumber: 307
path: "/documents/revuekitz/307_multi_line_field"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="MultiLineField"></revue-components>

## ■ 概要（overview）
### コンポーネント名
- MultiLineField

### レベル (Atomic Design)
-  Atoms（原子）

### カテゴリー（category）
- fields

## ■ データ（data）

### 【reactive/ref】
- `valueName` (string): テキストエリアに入力された値を保持します。

### 【props】
- `id` (string): テキストエリアのHTML要素のID属性
- `class` (string): テキストエリアに適用される追加のCSSクラス
- `name` (string): テキストエリアのHTML要素のname属性
- `style` (string): テキストエリアに適用されるインラインスタイル
- `styleReset` (boolean): スタイルをリセットするかどうかを示すフラグ
- `isDisabled` (boolean): テキストエリアが無効化されているかどうかを示すフラグ
- `isReadonly` (boolean): テキストエリアが読み取り専用であるかどうかを示すフラグ
- `isRequired` (boolean, default: false): テキストエリアを入力必須にするかどうかを示すフラグ
- `placeholder` (string): テキストエリアのプレースホルダーテキスト
- `maxlength` (number, default: null): テキストエリアで許容される最大文字数。設定時のみ、入力文字数カウンター（`現在の文字数 / maxlength`）がテキストエリアの下に表示される
- `minlength` (number, default: 0): テキストエリアで許容される最小文字数
- `rows` (number): テキストエリアの表示行数
- `cols` (number): テキストエリアの表示列数
- `text` (string): テキストエリアの初期値
- `resize` (string, default: ''): テキストエリアのリサイズ方向（CSSの`resize`プロパティ、例: `'none'` | `'both'` | `'horizontal'` | `'vertical'`）。`style`に自動でマージされる

### 【emit】
- `update:modelValue` - テキストエリアの値が変更されたときに発行されるイベント

### 【computed】
- `bindingClass` - `styleReset`が `true` の場合は `props.class` を返し、それ以外の場合は `revuekitz-multi-line-field ${props.class}` をクラス名として返す

### 【補足】文字数カウンター表示
- `maxlength`を設定した場合のみ、テキストエリアの右下に`現在の文字数 / maxlength`のカウンターが表示される。
- `minlength`を設定している場合、入力文字数がそれに満たない間はカウンターが青字（`is-under-limit`）になる。
- 入力文字数が`maxlength`に達した場合はカウンターが赤字（`is-over-limit`）になる。

## ■ 使用例（usecase）
```vue
<script setup>
import { MultiLineField } from 'revuekitz'
import 'revuekitz/dist/style.css' 
import { ref } from 'vue'

const longText = ref('abcdefghijklmnopqrstuvwxyz')
</script>

<template>
  <MultiLineField
    id="multiLinesFieldId"
    class="multi-lines-field-class"
    style="width: 300px"
    name="multi_lines_field_name"
    :isDisabled="false"
    :isReadonly="false"
    :isRequired="false"
    placeholder="placeholderText"
    :maxlength="500"
    :minlength="10"
    :rows="3"
    :cols="30"
    resize="none"
    v-model="longText"
  />
</template>

```

</nuxt-content-wrapper>
