<script setup lang="ts">
  import {  ref, reactive, computed } from 'vue';
  import Pagination from "@/components/global/navigations/Pagination.vue";
  import TextField from "@/components/global/fields/TextField.vue";

  const th = ref(null);
  const td = ref(null);

  type State = {
    message: string;
    search: string;
    items: [];
  }

  const state = reactive<State>({
    message: 'Search/Filter In Table',
    search: '',
    items: []
  });

  const props = defineProps({
    seach_mode: {
      type: Boolean,
      default: true
    },
    pagination_mode: {
      type: Boolean,
      default: true
    },
    headers: {
      type: Array,
      default: ["日付", "タイトル", "内容"]
    },
    items: {
      type: Array,
      default: []
    },
  })

  const highLight = (text: string | number) => {
  // テキストが数値ならば文字列に変換する
  const searchText = typeof text === 'number' ? String(text) : text;

  // 検索語が空の場合や、テキストが検索語を含まない場合はそのまま返す
  const searchWord = state.search.trim();
  if (!searchWord || !searchText.includes(searchWord)) {
    return searchText;
  }

  // 検索語を強調表示する
  const re = new RegExp(searchWord, 'ig');
  return searchText.replace(re, function (search) {
    return '<span style="background-color:yellow;font-weight:bold">' + search + '</span>';
  });
};

  const sortDateAsc = (columnName:string) =>{
    state.items.sort((a, b) => {
      return  (a[columnName] > b[columnName] ? 1 : -1);
    });
  }
  const sortDateDesc = (columnName:string) =>{
    state.items.sort((a, b) => {
      return  (a[columnName] < b[columnName] ? 1 : -1);
    });
  }

  const search_items = computed(() => {
    let searchWord = state.search.trim();
    if (searchWord === '') return state.items;
    return state.items.filter((item) => {
      const itemValues = Object.values(item);
      return itemValues.some(value => typeof value === 'string' && value.includes(searchWord));
    });
  });

  const getDispItems = (dispArray: []) => {
    state.items  = dispArray;
  };

</script>
<template>
  <div class="table-scroll">
    <div v-if="seach_mode" class="textfield-area">
      <label>Search</label>
      <TextField
        v-model:binding-value="state.search" 
      />
    </div>
    <table>
      <thead>
        <tr  >
          <th ref="th" v-for="header in props.headers"> 
            {{ header }} 
            <div @click="sortDateDesc(header as string)">▼</div>
            <div @click="sortDateAsc(header as string)">△</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="obj in search_items" :key="obj">
          <td ref="td" v-for="val in obj" v-html="highLight(val)"></td>
        </tr>
      </tbody>
    </table>
    <div v-if="pagination_mode"  class="pagination-area">
      <Pagination
          @handleAction="getDispItems"
          :items = props.items
          :steps=2
    ></Pagination>
    </div>

  </div>
</template>
<style scoped>
  label{
    margin-right: 5px;
  }
  .table-scroll{
    position: relative;
    overflow: auto;
  }
  table { 
    width: max-content;
    border-collapse: collapse;
  }

  thead th{
    min-width: 300px;
  }

  td,
  th {
    text-align: left;
    padding: 8px;
  }
  td{
    border-bottom: 1px solid #dddddd;
    background-color: whitesmoke;
    font-size:12px;
  }
  th {

    color: black;
    background-color: #dddddd;
  }


  .textfield-area{
    display: flex;
    justify-content: flex-end;
  }
  .pagination-area{
    display: flex;
    justify-content: center;
  }
</style>
