<script setup>

import Pagination from "@/components/global/paginations/Pagination.vue";

const items = ref([
  {"id": 1, "name_jp": "コーヒー", "name_en": "coffee"},
  {"id": 2, "name_jp": "エスプレッソ", "name_en": "espresso"},
  {"id": 3, "name_jp": "カプチーノ", "name_en": "cappuccino"},
  {"id": 4, "name_jp": "カフェモカ", "name_en": "mocha"},
  {"id": 5, "name_jp": "ティー", "name_en": "tea"},
  {"id": 6, "name_jp": "サンドイッチ", "name_en": "sandwich"},
  {"id": 7, "name_jp": "ホットドック", "name_en": "hotdog"},
  {"id": 8, "name_jp": "オムレツ", "name_en": "omelette"},
  {"id": 9, "name_jp": "サラダ", "name_en": "salad"},
  {"id": 10, "name_jp": "カレー", "name_en": "curry"},
]);

const displayItems = ref([]);


// 開始インデックスから終了インデックスまでの要素を抽出する関数
const getArrayRange = (startIndex, endIndex) => {
  // console.log(items.value);
  // console.log(startIndex);
  // console.log(endIndex);
  const array =  items.value;
  // 範囲が無効な場合は空の配列を返す
  if (startIndex < 0 || endIndex >= array.length || startIndex > endIndex) {
    return [];
  }
  // 配列の一部を抽出して新しい配列として返す
  const resultArray  = array.slice(startIndex, endIndex + 1);

  if(resultArray.length>0){
    return displayItems.value = resultArray;
  }

  
};

</script>

<template>
  <div>
    <h2>Cafe Menu</h2>
    <p class="count"></p>
    <div>
      <ul class="menu_list">
      <li v-for="item in displayItems" :key="item.id">
        <span>{{ item.name_jp }}</span>
      </li>
    </ul>
    </div>
    <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
    <div>
      <Pagination
        @handleAction="getArrayRange"
    ></Pagination>

    </div>

  </div>
</template>

<style>
.menu_list {
  height: 150px;
}
</style>
