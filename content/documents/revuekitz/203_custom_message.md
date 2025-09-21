---
title: 【revuekitz】CustomMessage
description:
category: vue
createdAt: 2024-08-11
updatedAt: 2025-08-11
sortNumber: 203
path: "/documents/revuekitz/203_custom_message"
--- 

<nuxt-content-wrapper>

## ■ コンポーネントデモ(demo)
<revue-components component="CustomMessage"></revue-components>

※infoメッセージは3秒後に消えます。

## ■ 概要（Overview）
### コンポーネント名
- CustomMessage

### レベル (Atomic Design)
- Atoms（原子）

### カテゴリー（Category）
- displays

## ■ データ（Data）
### 【props】
- id (string): コンポーネントのID（任意）
- class (string): 追加クラス名（任意）
- style (string | object): スタイル（任意）
- message (string): 表示メッセージ
- mode (string): メッセージ種別（例: "warning", "info", "error"）
- duration (number): 表示時間（ミリ秒）。0の場合は自動非表示なし。

### 【reactive/ref】
- visible (boolean): メッセージ表示状態（フェードアウト制御）

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import { CustomMessage } from 'revuekitz'
import 'revuekitz/dist/style.css'
</script>

<template>
  <CustomMessage
    message="This is an info message."
    mode="info"
    :duration="3000"
  />
</template>
```
</nuxt-content-wrapper>