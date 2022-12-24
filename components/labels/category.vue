<template>
  <v-card id="category" class="ma-2 pl-2 pr-2 label-list">
    <div class="category-title d-flex justify-space-between pr-3 pl-3">
      <div></div>
      <!-- リストタイトル -->
      <div class="mt-2 mb-2">{{ title }}</div>
      <!-- リスト削除 -->
      <div>
        <button class="btn btn-danger" @click="deleteCategory">✖</button>
      </div>
    </div>
    <!-- カード表示 :category="items" -->
    <draggable group="items" :list="items" @end="$emit('change')">
      <item
        v-for="(item, index) in items"
        :key="index"
        :categoryIndex="categoryIndex"
        :itemIndex="index"
        :text="item.text"
        tag="div"
        class="item-border d-flex justify-space-between pa-3"
      />
    </draggable>
    <!-- カード追加 -->
    <input
      class="input-item"
      placeholder="アイテムを追加する"
      @keyup.enter="addItem($event)"
    />
  </v-card>
</template>
<script>
import draggable from "vuedraggable";
// import item from "../label/item.vue";
export default {
  components: {
    draggable,
    item,
  },
  props: {
    categories: {},
    title: {
      type: String,
      required: true,
    },
    categoryIndex: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    //カテゴリー削除
    deleteCategory: function () {
      if (confirm("本当にこのカテゴリーを削除しますか？")) {
        this.$store.dispatch("label/deleteCategory", {
          categoryIndex: this.categoryIndex,
        });
      }
    },
    //カード追加
    addItem: function (e) {
      if (e.target.value == "") {
        return;
      } else {
        this.$store.dispatch("label/addItem", {
          text: e.target.value,
          categoryIndex: this.categoryIndex,
        });
        e.target.value = "";
      }
    },
  },
};
</script>
<style scoped>
#labels {
  background-color: rgb(183, 204, 219);
  height: 100%;
  overflow-x: auto;
}
.input-category {
  background-color: rgb(241, 241, 243);
}

/*ラベルの列 */
.label-list {
  height: 100%;
}

.category-title {
  font-size: 20px;
  word-break: break-all;
}
.input-item {
  display: block;
  width: 300px;
  height: 50px;
  text-align: center;
}
.item-border {
  width: 300px;
  display: flex;
  margin: 0 0 -1px;
  border: 1px dashed black;
  word-break: break-all;
}
</style>
