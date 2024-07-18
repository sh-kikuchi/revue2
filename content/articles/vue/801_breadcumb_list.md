---
title: 【revuekitz】BreadcrumbList
description: A customizable breadcrumb list component for navigation.
category: vue
createdAt: 2024-07-03
updatedAt: 2024-07-03
sortNumber: 801
path: "/articles/vue/801_breadcumb_list"
---

<nuxt-content-wrapper>

## ■ 概要（Overview）
### コンポーネント名
- BreadcrumbList

### コンポーネントレベル
- 原子（Atom）

### カテゴリー（category）
- navigations

## ■ データ（Data）
### 【reactive/ref】
(なし)

### 【props】
- `items` (Array): ルート要素のアイテムを定義する配列。各アイテムは`href`（リンク先）と`name`（表示名）を含むオブジェクト。
- `id` (String): ルート要素のHTML要素のID属性。
- `class` (String): ルート要素のカスタムクラス。
- `style` (Object): ルート要素のインラインスタイル。

### 【computed】
- `bindingClass`: スタイルリセットフラグに応じたクラス名を返す (Returns class name based on styleReset flag)

## ■ 依存関係（Dependency）
（なし）

## ■ 使用例（Usage Example）

```vue
<template>
  <BreadcrumbList 
    :items="[
      { href: '/', name: 'home' },
      { href: '/about', name: 'about' },
      { name: 'current page' }
    ]" 
    id="breadcrumbListId" 
    class="breadcrumb-list-class" 
    :style="{ color: 'blue' }" 
  />
</template>
```

</nuxt-content-wrapper>