---
title: 【revuekitz】ToggleSwitch
description: A customizable toggle switch component for toggling between two states.
category: vue
createdAt: 2024-07-02
updatedAt: 2024-07-02
sortNumber: 412
path: "/articles/vue/412_toggle_switch"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- ToggleSwitch

### コンポーネントレベル
- 原子（Atomic）

## ■ データ（Data）

### 【reactive/ref】

- bindingValue (Boolean): スイッチの状態を保持します。

## ■ プロパティ（Props）

- id (String): スイッチのHTML要素のID属性。
- backgroundColor (String): スイッチの背景色。
- size (String): スイッチのサイズを指定します。`'S'`（小）、`'M'`（中）、`'L'`（大）のいずれかを指定します。

## ■ イベント（Events）

### 【update:bindingValue】
- スイッチの状態が変更されたときに発行されるイベント。

## ■ コンピューテッド（Computed）

### 【bindingClass】
- `size` プロパティに基づいて適切なスタイルクラスを計算します。

### 【bindingStyle】
- `size` プロパティに基づいて適切なスタイルオブジェクト（背景色、幅、高さ）を計算します。

## ■ 使用例（Usage Example）

```vue
<template>
  <ToggleSwitch
    id="example-toggle"
    class="example-toggle-switch"
    size="M"
    background-color="#4CAF50"
    v-model="switchValue"
    @update:bindingValue="handleSwitchChange"
  />
</template>

<script setup>
import ToggleSwitch from '@/components/global/ToggleSwitch.vue'
import { ref } from 'vue'

const switchValue = ref(false)

const handleSwitchChange = (newValue) => {
  console.log('Switch value changed:', newValue)
}
</script>

```

</nuxt-content-wrapper>