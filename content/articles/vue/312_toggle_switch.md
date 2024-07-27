---
title: 【revuekitz】ToggleSwitch
description:
category: vue
createdAt: 2024-07-20
updatedAt: 2024-07-20
sortNumber: 312
path: "/articles/vue/312_toggle_switch"
---

<nuxt-content-wrapper>

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
- `update:bindingValue`: トグルスイッチのチェック状態が変更されたときに発行されるイベント。

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

const handleSwitchChangeS = (newValue) => {
  console.log('Small Switch value:', newValue)
}

const handleSwitchChangeM = (newValue) => {
  console.log('Medium Switch value:', newValue)
}

const handleSwitchChangeL = (newValue) => {
  console.log('Large Switch value:', newValue)
}
</script>

<template>
  <!-- 小サイズ（S） -->
  <ToggleSwitchS
    id="small-toggle"
    backgroundColor="#4caf50"
    size="S"
    @update:bindingValue="handleSwitchChangeS"
  />

  <!-- 中サイズ（M） -->
  <ToggleSwitchM
    id="medium-toggle"
    backgroundColor="#2196f3"
    size="M"
    @update:bindingValue="handleSwitchChangeM"
  />

  <!-- 大サイズ（L） -->
  <ToggleSwitchL
    id="large-toggle"
    backgroundColor="#f44336"
    size="L"
    @update:bindingValue="handleSwitchChangeL"
  />
</template>

```

</nuxt-content-wrapper>
