<script setup>
  import { useLabelsStore } from "@/store/labels"
  import 'revuekitz/dist/style.css'
  import { BasicButton, PageTitle, TextField } from 'revuekitz'
  import { LayoutWrapper } from 'revuekitz'

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
<template>
  <PageTitle>Labels</PageTitle>
  <LayoutWrapper>
    <div>
      <div class="flex justify-end mx-2 my-3">
        <BasicButton
          type   = "button"
          :style="{  margin: '10px', color: 'white', backgroundColor: 'orange' }"
          v-on:click="clearAllData()"
        >
          データ全消去
        </BasicButton>
        <BasicButton
          type   = "button"
          effect = "btnPush"
          :style="{ margin:'10px',color: 'white', backgroundColor: 'blue' }"
          v-on:click="getCsv()"
        >
          CSV出力
        </BasicButton>
      </div>
      <div>
        <div cols="12" class="mx-1">
          <div class="bg-color mx-auto">         
            <div class="category-add-area flex justify-center" >
                <div class="pl-4">Category</div>
            </div>
            <div class="category-add-area flex justify-center" >
              <TextField
                placeholder="Enterキーでカテゴリー追加"   
                v-model="addNewCategoryForm"
                @keyup.enter="addCategory"
              />
            </div>
            <div v-for="(category, i) in categories" :key="i" class="my-4">
              <div>
                <h3 class="category-name px-1 flex justify-space-between">
                  <div class="ml-auto" @click="toggleDisplay(i)" flat>
                    <span v-if="category.toggle">▲</span>
                    <span v-else>▼</span>
                  </div>
                  <div>{{ category.name }}</div>
                  <div  @click="deleteCategory(i)">&times;</div>
                </h3> 
              </div>
              <div v-if="category.toggle">
                <div class="flex justify-center">
                  <TextField
                    placeholder="Enterキーでアイテム追加"   
                    v-model:binding-value="addNewItemForm[i]"
                    @keyup.enter="addItem(i)"
                  />
                </div>
                <div v-for="(item, j) in category.items" :key="j">
                  <div class="d-flex align-center justify-space-between">
                    <div style="width: 85%;"><span class="pr-2 text-center" @click="deleteItem(i,j)" style=" width: 15%;">× </span>{{ item.text }}</div>
                  </div>
                </div>
                <div v-if="category.items.length===0" class="text-center">データなし</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LayoutWrapper>
</template>
<style scoped>
#labels {
  background-color: rgb(183, 204, 219);
  height: 100%;
  overflow-x: auto;
}

.label-content {
  display: flex;
}

.label-list {
  height: 100%;
}

.category-name{
  background-color: lightgray;
}

.category-title {
  font-size: 20px;
}

.item-border {
  width: 300px;
  display: flex;
  border: 1px dotted black;
  word-break: break-all;
}

.bg-color{
  background-color: whitesmoke;
  margin: 10px;
}
</style>
