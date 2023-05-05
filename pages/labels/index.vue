<template>
  <PageTitle title="Labels" />
  <Wrapper>
  <v-container class="grey lighten-5">
    <v-row class="justify-end mx-2 my-3">
      <v-btn 
      @click="clearAllData()"
      depressed 
      color="error"
    >
      データ全消去
    </v-btn>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="mx-1">
        <v-card class="mx-auto">         
          <div class="d-flex align-center justify-space-between" >
              <div class="pl-4">▼ Category</div>
              <v-btn class="ml-auto" @click="getCsv()" flat>CSV出力</v-btn>
          </div>
          <v-text-field 
            placeholder="Enterキーでカテゴリー追加"
            @keyup.enter="addCategory"
            v-model="addNewCategoryForm"
          ></v-text-field>
          <div v-for="(category, i) in categories" :key="i" class="my-4">
            <div class="d-flex align-center justify-space-between" >
              <h3 class="pl-3">0{{i +1 }}_{{ category.name }}</h3> <v-btn class="ml-auto" @click="toggleDisplay(i)" flat>Open</v-btn>
              <v-btn @click="deleteCategory(i)" flat>カテゴリー消去</v-btn>
            </div>
            <div v-if="category.toggle">
              <v-text-field 
                placeholder="Enterキーでアイテム追加" 
                @keyup.enter="addItem(i)" 
                v-model="addNewItemForm[i]">
              </v-text-field>
              <div v-for="(item, j) in category.items" :key="j">
                <div class="d-flex align-center justify-space-between">
                  <div style="width: 85%;"><v-icon class="pr-2 text-center" @click="deleteItem(i,j)" style=" width: 15%;">mdi-delete </v-icon>{{ item.text }}</div>
                </div>
              </div>
              <div v-if="category.items.length===0" class="text-center">データなし</div>
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
const getCsv = () => {
  labelsStore.getCsv();
}
const toggleDisplay = (categoryIndex) =>{
  labelsStore.toggleDisplay(categoryIndex);
}

const clearAllData = () =>{
  localStorage.removeItem('labels');
  window.location.reload();
}
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
