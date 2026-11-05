<script setup>
import { useLabelsStore } from "@/store/labels";
import "revuekitz/dist/style.css";
import { BasicButton, PageTitle, TextField } from "revuekitz";
import { LayoutWrapper } from "revuekitz";

//store
const labelsStore = useLabelsStore();
const categories = labelsStore.categories;
const addNewCategoryForm = ref("");
const addNewItemForm = ref([]);

//日本語入力の変換確定で押したEnterかどうか
const isImeEnter = (e) => e.isComposing || e.keyCode === 229;

const addCategory = () => {
  const categoryName = addNewCategoryForm.value.trim();
  if (!categoryName) return;
  labelsStore.addCategory(categoryName);
  addNewCategoryForm.value = "";
};

const deleteCategory = (categoryIndex) => {
  const categoryName = categories[categoryIndex]?.name;
  if (!window.confirm(`カード「${categoryName}」を削除します。よろしいですか？`)) return;
  labelsStore.deleteCategory(categoryIndex);
  addNewItemForm.value.splice(categoryIndex, 1);
};

const addItem = (categoryIndex) => {
  const itemName = (addNewItemForm.value[categoryIndex] ?? "").trim();
  if (!itemName) return;
  labelsStore.addItem(itemName, categoryIndex);
  addNewItemForm.value[categoryIndex] = "";
};

const deleteItem = (categoryIndex, itemIndex) => {
  labelsStore.deleteItem(categoryIndex, itemIndex);
};

const getCsv = () => {
  labelsStore.getCsv();
};

const toggleDisplay = (categoryIndex) => {
  labelsStore.toggleDisplay(categoryIndex);
};

const clearAllData = () => {
  if (!window.confirm("すべてのカードとアイテムを消去します。元に戻せませんが、よろしいですか？")) return;
  localStorage.removeItem("labels");
  window.location.reload();
};
</script>
<template>
  <LayoutWrapper maxWidth="720px">
    <div class="labels-page">
      <div class="labels-header">
        <PageTitle class="labels-title">Labels</PageTitle>
        <div class="labels-actions">
          <BasicButton type="button" class="clear-button" v-on:click="clearAllData()">
            データ全消去
          </BasicButton>
          <BasicButton type="button" class="csv-button" v-on:click="getCsv()">CSV出力</BasicButton>
        </div>
      </div>
      <section class="panel category-add-area">
        <label class="add-label" for="new-category">カテゴリーを追加</label>
        <div class="add-row">
          <TextField
            id="new-category"
            class="add-input"
            placeholder="カテゴリー名を入力"
            v-model="addNewCategoryForm"
            @keydown.enter="!isImeEnter($event) && addCategory()"
          />
          <BasicButton type="button" class="add-button" v-on:click="addCategory()">追加</BasicButton>
        </div>
      </section>
      <section v-for="(category, i) in categories" :key="i" class="panel">
        <h3 class="category-name">
          <button
            type="button"
            class="toggle-button"
            :aria-expanded="category.toggle"
            :aria-label="`${category.name}を${category.toggle ? '閉じる' : '開く'}`"
            @click="toggleDisplay(i)"
          >
            <span v-if="category.toggle">▲</span>
            <span v-else>▼</span>
          </button>
          <span class="category-title">{{ category.name }}</span>
          <button type="button" class="category-delete" @click="deleteCategory(i)">
            カード削除
          </button>
        </h3>
        <div v-if="category.toggle" class="category-body">
          <div class="add-row">
            <TextField
              class="add-input"
              placeholder="アイテムを入力"
              :aria-label="`${category.name}にアイテムを追加`"
              v-model="addNewItemForm[i]"
              @keydown.enter="!isImeEnter($event) && addItem(i)"
            />
            <BasicButton type="button" class="add-button" v-on:click="addItem(i)">追加</BasicButton>
          </div>
          <ul v-if="category.items.length > 0" class="item-list">
            <li v-for="(item, j) in category.items" :key="j" class="item-row">
              <span class="item-text">{{ item.text }}</span>
              <button
                type="button"
                class="item-delete"
                :aria-label="`${item.text}を削除`"
                @click="deleteItem(i, j)"
              >
                &times;
              </button>
            </li>
          </ul>
          <p v-else class="item-empty">データなし</p>
        </div>
      </section>
    </div>
  </LayoutWrapper>
</template>
<style scoped>
.labels-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 8px 32px;
}

.labels-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

h1.labels-title {
  margin: 0;
}

.labels-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 16px;
}

.clear-button {
  color: #8b0000;
  background-color: transparent;
  border: 1px solid #8b0000;
}

.csv-button {
  color: white;
  background-color: blue;
}

.panel {
  margin: 0;
  background-color: whitesmoke;
  border-radius: 6px;
  overflow: hidden;
}

.category-add-area {
  padding: 16px;
}

.add-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 700;
}

.add-row {
  display: flex;
  gap: 8px;
}

input.add-input {
  flex: 1;
  min-width: 0;
  padding: 8px 10px;
  font-size: 16px;
  background-color: white;
  border: 1px solid #767676;
  border-radius: 4px;
}

.add-button {
  flex-shrink: 0;
  padding: 8px 16px;
  color: white;
  background-color: #444;
}

.category-name {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 8px 12px;
  background-color: lightgray;
}

.category-title {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

.toggle-button,
.category-delete,
.item-delete {
  flex-shrink: 0;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
}

.toggle-button {
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: inherit;
}

.category-delete {
  padding: 6px 8px;
  font-size: 13px;
  font-weight: 400;
  color: #8b0000;
  border-radius: 4px;
}

.category-body {
  padding: 16px;
}

.item-list {
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
}

.item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 4px 6px 8px;
  border-top: 1px solid #d8d8d8;
}

.item-text {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

.item-delete {
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 18px;
  color: #666;
  border-radius: 4px;
}

.item-empty {
  margin: 12px 0 0;
  color: #666;
}

/* タップ後にホバー表示が残らないよう、マウス操作時のみ適用 */
@media (hover: hover) {
  .clear-button:hover,
  .category-delete:hover {
    color: white;
    background-color: #8b0000;
  }

  .item-row:hover {
    background-color: #ebebeb;
  }

  .item-delete:hover {
    color: #8b0000;
    background-color: #dcdcdc;
  }
}

/* タッチ操作では押し間違えないようタップ領域を広げる */
@media (pointer: coarse) {
  .toggle-button,
  .item-delete {
    width: 44px;
    height: 44px;
  }

  .category-delete {
    min-height: 44px;
  }
}
</style>
