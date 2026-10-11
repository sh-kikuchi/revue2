---
title: 【revuekitz】ToggleSwitch
description:
category: vue
createdAt: 2024-07-20
updatedAt: 2026-10-10
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
- `modelValue` (boolean): トグルスイッチのチェック状態。
- `isDisabled` (boolean, default: false): トグルスイッチの無効状態。見た目が薄くなり操作できなくなる。
- `isReadonly` (boolean, default: false): トグルスイッチの読み取り専用状態。チェックボックスはネイティブの`readonly`属性に対応していないため、`change`イベント側で状態を元に戻すことで読み取り専用の挙動を実現している。

### 【emit】
- `update:modelValue`: トグルスイッチのチェック状態が変更されたときに発行されるイベント。

### 【computed】
- `bindingClass`: `size` に応じてトグルスイッチのサイズクラスを計算します。
- `bindingStyle`: `size` に応じてトグルスイッチのスタイル（幅、高さ）を計算します。

## ■ 使用例（usecase）

```vue
<script setup>
import { ToggleSwitch } from 'revuekitz'
import 'revuekitz/dist/style.css'
import { ref } from 'vue'

const toggleSwitchCheckedS = ref(false)
const toggleSwitchCheckedM = ref(false)
const toggleSwitchCheckedL = ref(false)
</script>

<template>
  <!-- 小サイズ（S） -->
  <ToggleSwitch 
    id="small-toggle"
    backgroundColor="#4caf50"
    size="S" 
    :isDisabled="false"
    :isReadonly="false"
    v-model="toggleSwitchCheckedS" 
  />

  <!-- 中サイズ（M） -->
  <ToggleSwitch
    id="medium-toggle"
    backgroundColor="#2196f3"
    size="M"
    v-model="toggleSwitchCheckedM" 
  />

  <!-- 大サイズ（L） -->
  <ToggleSwitch
    id="large-toggle"
    backgroundColor="#f44336"
    size="L"
    v-model="toggleSwitchCheckedL" 
  />
</template>

```

</nuxt-content-wrapper>
