---
title: 【revuekitz】ToDoList
description: 
category: vue
createdAt: 2026-09-15
updatedAt: 2026-09-15
sortNumber: 606
path: "/documents/revuekitz/606_to_do_list"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="ToDoList"></revue-components>

## ■ 概要（Overview）
### コンポーネント名
- ToDoList

### レベル (Atomic Design)
- Molecules（分子）

### カテゴリー（Category）
- lists

## ■ データ（Data）
### 【reactive/ref】
- `items`: 現在のToDoアイテムの配列 (Reactive list of todo items)
- `todo`: 入力中のToDoテキスト (Text bound to the new-item input field)

### 【props】
- `id` (string) - コンポーネントのID
- `class` (string) - コンポーネントのクラス
- `style` (string | object) - コンポーネントのスタイル
- `styleReset` (boolean) - スタイルリセットフラグ
- `modelValue` (Array) - 表示するToDoアイテムの配列。各アイテムは`title`（項目名）と`checked`（完了フラグ）を持つ。v-model対応。

### 【emit】
- `modelValue`: アイテムの追加・削除・チェック状態の変更のたびに、更新後のアイテム配列を渡して発火 (Emits the updated items array whenever an item is added, deleted, or its checked state is toggled)

### 【computed】
- `bindingClass`: スタイルリセットフラグに応じたクラス名を返す (Returns class name based on styleReset flag)

## ■ イベント（Event）
- `addItem()`: 入力欄のテキストから新しいアイテム（未完了）を追加する (Adds a new unchecked item from the input field)
- `deleteItem(index: number, event: Event)`: 指定したアイテムをリストから削除する (Deletes an item from the list)
- `toggleCheck(index: number, isChecked: boolean)`: 指定したアイテムの完了状態を切り替える (Toggles the checked state of an item)

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ToDoList } from 'revuekitz'
import 'revuekitz/dist/style.css'

const todoItems = ref([
  { title: 'Item #1', checked: false },
  { title: 'Item #2', checked: true }
])
</script>

<template>
  <ToDoList
    id="toDoListId"
    class="to-do-list-class"
    :style="{ color: 'black' }"
    :styleReset="false"
    v-model="todoItems"
  />
</template>

```

</nuxt-content-wrapper>
