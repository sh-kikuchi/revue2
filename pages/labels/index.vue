<template>
  <PageTitle title="Labels" />
  <Wrapper>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="12" class="mx-1">
        <v-card class="mx-auto">
          <p class="text-center pt-1 pb-1">Category</p>
          <v-text-field 
            placeholder="Enterキーでカテゴリー追加"
            @keyup.enter="addCategory"
            v-model="addNewCategoryForm"
            ></v-text-field>
          <v-divider class="mt-1 mb-1"/>
          <div v-for="(Category, i) in categories" :key="i">
            <div class="d-flex align-center justify-space-between">
              <div style=" width: 85%;">{{ Category.name }}</div>
              <v-btn @click="deleteCategory(i)">カテゴリー消去</v-btn>
            </div>
            <v-text-field 
              placeholder="Enterキーでアイテム追加" 
              @keyup.enter="addItem(i)" 
              v-model="addNewItemForm[i]">
            </v-text-field>
                <div v-for="(item, j) in Category.items" :key="j">
                  <div class="d-flex align-center justify-space-between">
                    <div style="width: 85%;"><v-icon class="pr-2 text-center" @click="deleteItem(i,j)" style=" width: 15%;">mdi-delete </v-icon>{{ item.text }}</div>
                  </div>
                </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </Wrapper>
</template>
<script setup>

import { useLabelsStore } from "@/store/labels"
import Wrapper from "~~/components/commons/Wrapper.vue";
import PageTitle from "~~/components/commons/PageTitle.vue";

//store
const labelsStore = useLabelsStore();
const categories = labelsStore.categories;
const addNewCategoryForm = ref("");
const addNewItemForm = ref([]);

const addCategory = (e) => {
  labelsStore.addCategory(e.target.value);
  addNewCategoryForm.value = "";
}

const deleteCategory = (categoryIndex) => {
  labelsStore.deleteCategory(categoryIndex);
}

const addItem = (categoryIndex) => {
  labelsStore.addItem(event.target.value, categoryIndex);
  addNewItemForm.value = "";
}

const deleteItem = (categoryIndex, itemIndex) => {
  labelsStore.deleteItem(categoryIndex, itemIndex);
}

onMounted(() => {
  let reloadBanFlg = 0;
  document.addEventListener("keydown", function (e) {
    e.key === 'F5' ? reloadBanFlg = 1 : reloadBanFlg = 0;
    if (reloadBanFlg === 1) {
      alert("リロード禁止");
      e.preventDefault();
      reloadBanFlg = 0;
    }
  });
  window.addEventListener('beforeunload', function (e) {
    // メッセージを表示する
    e.returnValue = '本当にリロードを行いますか？';

  });
})
</script>
<style scoped>
#labels {
  background-color: rgb(183, 204, 219);
  height: 100%;
  overflow-x: auto;
}

.input-category {
  width: 220px;
  background-color: rgb(241, 241, 243);
}

.label-content {
  display: flex;
}

/*ラベルの列 */
.label-list {
  height: 100%;
}

.category-title {
  font-size: 20px;
}

.input-item {
  display: block;
  width: 100%;
  height: 50px;
  text-align: center;
}

.item-border {
  width: 300px;
  display: flex;
  border: 1px dotted black;
  word-break: break-all;
}
</style>
