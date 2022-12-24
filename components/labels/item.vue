<template>
  <div id="item">
    <div>{{ text }}</div>
    <div>
      <button class="btn btn-danger" @click="deleteItem">✖</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    categoryIndex: {
      type: Number,
      required: true,
    },
    itemIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    deleteItem: function () {
      if (confirm("本当にこのアイテムを削除しますか？")) {
        this.$store.dispatch("label/deleteItem", {
          categoryIndex: this.categoryIndex,
          itemIndex: this.itemIndex,
        });
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
  width: 100%;
  display: flex;
  border-bottom: 1px dotted black;
  word-break: break-all;
}
</style>
