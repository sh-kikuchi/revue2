---
title: 【revuekitz】TreeList
description: 
category: vue
createdAt: 2024-07-01
updatedAt: 2025-09-21
sortNumber: 605
path: "/documents/revuekitz/605_tree_list"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="TreeList"></revue-components>

## ■ 概要（Overview）
### コンポーネント名
- TreeList

### レベル (Atomic Design)
- 原子（Atoms）

### カテゴリー（Category）
- lists

## ■ データ（Data）
### 【reactive/ref】
- `grandparants`: 現在の祖父母リストの配列 (Reactive list of grandparents)

### 【props】
- `id` (string) : コンポーネントのID
- `class` (string) : コンポーネントのクラス
- `style` (string) : コンポーネントのスタイル
- `styleReset` (boolean) : スタイルリセットフラグ
- `grandparents` (Array) : 階層構造の祖父母リスト

### 【computed】
- `bindingClass`: スタイルリセットフラグに応じたクラス名を返す (Returns class name based on styleReset flag)

## ■ 使用例（Usecase）
```vue
<script setup lang="ts">
import { TreeList } from 'revuekitz'
import 'revuekitz/dist/style.css' 
</script>

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

```

</nuxt-content-wrapper>