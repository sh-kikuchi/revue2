---
title: 【revuekitz】ToggleSwitch
description:
category: vue
createdAt: 2024-07-20
updatedAt: 2025-09-21
sortNumber: 313
path: "/documents/revuekitz/313_toggle_switch"
---

<nuxt-content-wrapper>

## ■ コンポーネントデモ(demo)
<revue-components component="ToggleSwitch"></revue-components>

## ■ 概要（overview）
### コンポーネント名
- ToggleSwitch

### レベル (Atomic Design)
-  Atoms（原子）
  
### カテゴリー（category）
- fields

## ■ データ（data）

### 【props】
- `id` (string): トグルスイッチのHTML要素のID属性。
- `backgroundColor` (string): トグルスイッチの背景色。
- `size` (string): トグルスイッチのサイズを指定するプロパティ。`S`（小）、`M`（中）、`L`（大）が選択可能。

### 【emit】
- `update:val`: トグルスイッチのチェック状態が変更されたときに発行されるイベント。

### 【computed】
- `bindingClass`: `size` に応じてトグルスイッチのサイズクラスを計算します。
- `bindingStyle`: `size` に応じてトグルスイッチのスタイル（幅、高さ）を計算します。

## ■ 使用例（usecase）

```vue
<script setup>
import { ToggleSwitchS } from 'revuekitz'
import { ToggleSwitchM } from 'revuekitz'
import { ToggleSwitchL } from 'revuekitz'
import 'revuekitz/dist/style.css'

const toggleSwitchCheckedS = ref(false)
const toggleSwitchCheckedM = ref(false)
const toggleSwitchCheckedL = ref(false)
</script>

<template>
  <!-- 小サイズ（S） -->
  <ToggleSwitch 
    id="small-toggle"
    backgroundColor="#4caf50"
    size="L" 
    v-model="toggleSwitchCheckedS" 
  />

  <!-- 中サイズ（M） -->
  <ToggleSwitchM
    id="medium-toggle"
    backgroundColor="#2196f3"
    size="M"
    v-model="toggleSwitchCheckedM" 
  />

  <!-- 大サイズ（L） -->
  <ToggleSwitchL
    id="large-toggle"
    backgroundColor="#f44336"
    size="L"
    v-model="toggleSwitchCheckedL" 
  />
</template>

```

</nuxt-content-wrapper>
