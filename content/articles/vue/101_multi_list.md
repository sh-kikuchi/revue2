---
title: 【Component】MultiList
description: マルチリスト
category: vue
createdAt: 2022-12-25
updatedAt: 2022-12-25
sortNumber: 5
path: "/articles/vue/005_slot"
---

<nuxt-content-wrapper>


<br><br>

## 1. コンポーネント名
MultiList


## 2. 概要
カテゴリーごとにリストを作って編集できるコンポーネント（コピペ可）

<br>

## 3. コード
```vue
<template>
  <div cols="12" class="mx-1">
    <div class="mx-auto">   
      <div v-if="state.categories.length===0" class="text-center">
        データなし
      </div>
      <div v-for="(category, i) in state.categories" :key="i" class="my-4">
        <div>
          <h3 class="pl-3">0{{i +1 }}_{{ category.name }}</h3> <button class="open-btn" @click="toggleDisplay(i)">open</button>
          <button @click="deleteCategory(i)" flat>カテゴリー消去</button>
        </div>
        <div v-if="category.toggle">
          <div v-if="category.items.length===0" class="text-center">データなし</div>
          <div v-for="(item, j) in category.items" :key="j">
            <ul>
              <ol>
                <button class="delete-btn" @click="deleteItem(i,j)">×</button>{{ item.text }}
              </ol>
            </ul>
          </div>
          <input 
            placeholder="Enterキーでアイテム追加" 
            @keyup.enter="addItem(i)" 
            v-model="state.addNewItemForm"
            />
        </div>
      </div>
      <input 
        placeholder="Enterキーでカテゴリー追加"
        @keyup.enter="addCategory"
        v-model="state.addNewCategoryForm"
      />
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
export default {
  setup() {
    const state = reactive({
    categories: [{
      name: '',
      items: [],
      toggle: false
    
    }],
    addNewCategoryForm: '',
    addNewItemForm:''
    });
    const addCategory = () =>{
      state.categories.push({
        name: state.addNewCategoryForm,
        items: [],
        toggle: false
      })
      state.addNewCategoryForm = ''
    }
    const deleteCategory = (categoryIndex) =>{
      state.categories.splice(categoryIndex, 1);
    }
    const addItem = (categoryIndex) =>{
      state.categories[categoryIndex].items.push({
        text: state.addNewItemForm
      });
      state.addNewItemForm = ''
    }
    const deleteItem = (categoryIndex, itemIndex) =>{
      state.categories[categoryIndex].items.splice(itemIndex, 1);
    }
    const toggleDisplay = (categoryIndex) =>{
      state.categories[categoryIndex].toggle === true 
        ? state.categories[categoryIndex].toggle = false 
        : state.categories[categoryIndex].toggle = true;
    }
    return {
      state,
      addCategory,
      deleteCategory,
      addItem,
      deleteItem,
      toggleDisplay
    };
  },
};
</script>
<style scoped>
input{
  width: 250px;
  border-radius: 5px;
  border: 1px #fff none;
  padding: 5px;
  margin: 5px;
}
.open-btn,.delete-btn{
  padding-right:5px;
  padding-left:5px;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;

  appearance: none;
}
</style>
```

<br>

## 4. 備考
特になし


</nuxt-content-wrapper>
