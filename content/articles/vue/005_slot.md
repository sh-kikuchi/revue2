---
title: 【Vue3】Slot
description: compositionAPI版。
category: vue
createdAt: 2022-12-25
updatedAt: 2022-12-25
sortNumber: 5
path: "/articles/vue/005_slot"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. slotの使い方](#2-slotの使い方)
- [3. 複数のslot(v-slot)](#3-複数のslotv-slot)
  - [■ 子コンポーネント](#-子コンポーネント)
  - [■ 親コンポーネント（読込側）](#-親コンポーネント読込側)
- [4. おわりに](#4-おわりに)

<br><br>

## 1. はじめに
slotの使い方をまとめてみます。

<br>

## 2. slotの使い方
(工事中)


## 3. 複数のslot(v-slot)

<br>

### ■ 子コンポーネント
１コンポーネントで複数のslotを使いたい時はv-slotを使う。v-slotで設定するのは、親コンポーネントのname属性。

```vue
  <template v-slot:aSide>
    A
  </template>
  <template v-slot:bSide>
    B
  </template>
```

<br>

### ■ 親コンポーネント（読込側）
子コンポーネントのv-slotを読み込む。v-slotの設定とslotのname属性が結び付けられていることを意識しよう。

```vue
<template>
  <div>
    <div>
        <slot name="aSide"></slot>
    </div>
    <div>
        <slot name="bSide"></slot>
    </div>
  </div>
</template>
```

<br>

## 4. おわりに
slotをあまり使ってこなかったのでピンとは来ていなかったが、Re:vueを書き直す過程でslotと向き合う時間が作れたので、こうしてまとめることが出来たのは良きかな。

</nuxt-content-wrapper>
