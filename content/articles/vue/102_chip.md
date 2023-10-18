---
title: Chip
description: 【Component】タグチップ
category: vue
createdAt: 2022-12-25
updatedAt: 2022-12-25
sortNumber: 102
path: "/articles/vue/102_chip"
---

<nuxt-content-wrapper>

<br><br>

## 1. コンポーネント名
Chip

## 2. 概要
タグチップを簡単につくれるコンポーネント

<br>

## 3. コード
```vue
<template>
<span class="chip" :style="chipStyle">
  <div class="chip-content">{{ props.content }}</div>
</span>
</template>
<script setup>

import { computed } from 'vue';
const props = defineProps({
  fontColor: {
    type: String,
    default:'white'
  },
  backgroundColor: {
    type: String,
    default:'blue'
  },
  content:  {
    type: String,
    default:'Chip-Content'
  },
})

const chipStyle = computed(() => {
  return `
    color: ${props.fontColor}
    background-color: ${props.backgroundColor}`;
});

</script>
<style scoped>
.chip{
    display: inline-flex;
    flex-direction: row;
    background-color: #e5e5e5;
    border: none;
    cursor: default;
    height: 36px;
    outline: none;
    padding: 0;
    font-size: 14px;
    font-color: #333333;
    font-family:"Open Sans", sans-serif;
    white-space: nowrap;
    align-items: center;
    border-radius: 16px;
    vertical-align: middle;
    text-decoration: none;
    justify-content: center;
}
.chip-head{
    display: flex;
    position: relative;
    overflow: hidden;
    background-color: #32C5D2;
    font-size: 1.25rem;
    flex-shrink: 0;
    align-items: center;
    user-select: none;
    border-radius: 50%;
    justify-content: center;
    width: 36px;
    color: #fff;
    height: 36px;
    font-size: 20px;
    margin-right: -4px;
}
.chip-content{
    cursor: inherit;
    display: flex;
    align-items: center;
    user-select: none;
    white-space: nowrap;
    padding-left: 12px;
    padding-right: 12px;
}
.chip-svg{
        color: #999999;
    cursor: pointer;
    height: auto;
    margin: 4px 4px 0 -8px;
  fill: currentColor;
    width: 1em;
    height: 1em;
    display: inline-block;
    font-size: 24px;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    user-select: none;
    flex-shrink: 0;
}
.chip-svg:hover{
    color: #666666;
}
</style>

```

<br>

## 4. 備考
特になし


</nuxt-content-wrapper>
