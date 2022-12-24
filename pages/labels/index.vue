<template>
  <PageTitle title="Labels" />
  <Wrapper>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="12" md="4" class="mx-1">
        <v-card class="mx-auto">
          <p class="text-center pt-1 pb-1">Category</p>
          <v-text-field placeholder="Enterキーでカテゴリー追加"
        @keyup.enter="addCategory" v-model="addNewCategoryForm"></v-text-field>
          <v-divider class="mt-1 mb-1"/>
          <div v-for="(lists, i) in categories" :key="i">
              <v-list v-model:opened="open[i]">
                <v-list-group :value="lists.name">
                  <template v-slot:activator="{ props }">
                    <div class="d-flex align-center justify-space-between">
                    <v-list-item v-bind="props" :title="lists.name" style=" width: 85%;"></v-list-item>
                    <v-icon class="pr-2 text-center" @click="deleteCategory(i)" style=" width: 15%;">mdi-delete </v-icon>
                    </div>
                  </template>
                  <v-list-group :value="lists.name">
                    <v-text-field placeholder="Enterキーでアイテム追加" @keyup.enter="addItem(i)" v-model="addNewItemForm"></v-text-field>
                    <div v-for="(item, j) in lists.children" :key="j">
                      <div class="d-flex align-center justify-space-between">
                        <v-list-item
                          :title="item.title"
                          :value="item.title"
                          @click="selectedItem(item,i,j)"
                          style=" width: 85%;"
                         >
                        </v-list-item>
                        <v-icon class="pr-2 text-center" @click="deleteItem(i,j)" style=" width: 15%;">mdi-delete </v-icon>
                      </div>

                    </div>
                  </v-list-group>
                </v-list-group>
              </v-list>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="7" class="mx-1">
        <v-card class="pa-2" outlined tile>
            <v-btn class="d-block my-2  ml-auto" color="primary" @click="saveItem(state)">編集内容を保存する</v-btn>
            <label>■ Title</label>
            <v-text-field v-model="state.title"></v-text-field>
            <label>■ Date</label>
            <v-text-field v-model="state.date"></v-text-field>
            <label>■ Memo</label>
            <v-text-field v-model="state.memo"></v-text-field>
            <label>■ Lists</label>
            <div v-if=(state.labels)>
              <v-text-field placeholder="Enterキーでラベル追加" @keyup.enter="addLabel" v-model="addNewLabelForm"></v-text-field>
              <div v-for="(label, index) in state.labels" :key="label">
                <div class="d-flex pa-4">
                  <v-text-field v-model="label.text" style=" width: 85%;"></v-text-field>
                    <v-icon class="pr-2 text-center" @click="deleteLabel(index)" style=" width: 15%;">mdi-delete </v-icon>
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
import { reactive } from 'vue'
import draggable from "vuedraggable";
import { useLabelsStore } from "@/store/labels"
import Wrapper from "~~/components/commons/Wrapper.vue";
import PageTitle from "~~/components/commons/PageTitle.vue";

//store
const labelsStore = useLabelsStore();
const categories = labelsStore.categories;
const open = labelsStore.open;
// const mountFlag = 1;

const state = reactive({
  title: "",
  date: "",
  memo: "",
  labels: [],
  categoryIndex: 0,
  itemIndex: 0

})

const addNewCategoryForm = ref("");
const addNewItemForm = ref("");
const addNewLabelForm = ref("");

const selectedItem = (value, categoryIndex, itemIndex) => {
  const data = JSON.parse(JSON.stringify(value));
  state.title = data.title;
  state.date = data.date;
  state.memo = data.memo;
  state.labels = data.labels;
  state.categoryIndex = categoryIndex;
  state.itemIndex = itemIndex;
}

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
  state.title = "";
  state.date = "";
  state.memo = "";
  state.labels = [];
  state.categoryIndex =  0,
  state.itemIndex =  0
}

const addLabel = () => {
  state.labels.push({
    text: event.target.value
  })
  addNewLabelForm.value = "";
}

const deleteLabel = (labelIndex) => {
  state.labels.splice(labelIndex, 1);
}

labelsStore.$subscribe((state) => {
  // persist the whole state to the local storage whenever it changes
  localStorage.setItem('Re:vue_labels', JSON.stringify(state))
})


const saveItem = (data) => {
  console.log(data);
  labelsStore.saveItem(data);
  alert("ローカルストレージに保存しました");
}

onMounted(() => {

  // window.addEventListener('beforeunload', (e) => {
  //   alert("リロードは使わないで下さい");
  //   return
  // });
  // window.addEventListener('popstate', (e) => {
  //   alert('ブラウザバックを使わないでください。');
  //   history.go(1);
  // });

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
