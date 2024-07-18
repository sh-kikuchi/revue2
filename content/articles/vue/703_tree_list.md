---
title: 【revuekitz】TreeList
description: 
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 703
path: "/articles/vue/703_tree_list"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- Tree List

### レベル (Atomic Design)
- 原子（Atoms）

### カテゴリー（Category）
- lists

## ■ データ（Data）
### 【reactive/ref】
- `grandparants`: 現在の祖父母リストの配列 (Reactive list of grandparents)

### 【props】
- `id` (string) - コンポーネントのID
- `class` (string) - コンポーネントのクラス
- `style` (string) - コンポーネントのスタイル
- `styleReset` (boolean) - スタイルリセットフラグ
- `grandparents` (Array) - 階層構造の祖父母リスト

### 【emit】
（なし）

### 【computed】
- `bindingClass`: スタイルリセットフラグに応じたクラス名を返す (Returns class name based on styleReset flag)

## ■ イベント（Event）
（なし）

## ■ 依存関係（Dependency）
（なし）

## ■ 使用例（Usecase）
```vue
<template>
  <TreeList
    id="tree-list"
    class="custom-tree-list"
    :style="{ color: 'black' }"
    :styleReset="false"
    :grandparents="[
      {
        id: '1',
        title: 'Grandparent #1',
        href: 'https://example.com/grandparent',
        parents: [
          {
            id: '1',
            title: 'Parent #1',
            href: 'https://example.com/parent',
            children: [
              {
                id: '1',
                title: 'Child #1',
                href: 'https://example.com/child',
                items: [
                  {
                    id: '1',
                    title: 'Item #1',
                    href: 'https://example.com/item1'
                  },
                  {
                    id: '2',
                    title: 'Item #2',
                    href: 'https://example.com/item2'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]"
  />
</template>

<script setup lang="ts">
import TreeList from './TreeList.vue'
</script>
</nuxt-content-wrapper>
``` 