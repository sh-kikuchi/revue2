<template>
  <div v-if="seach_mode">
    <input type="text" v-model="state.search" placeholder="フリーワード検索" />
  </div>
  <div class="table-scroll">
    <table>
      <thead>
        <tr>
          <th class="flex text-nowrap">日付 <div @click="sortDateDesc">▼</div><div @click="sortDateAsc">△</div></th>
          <th class="text-nowrap">タイトル</th>
          <th class="text-nowrap">内容</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in search_items" :key="user.id">
          <td v-html="highLight(user.date)"></td>
          <td class="title" v-html="highLight(user.title)"></td>
          <td v-html="highLight(user.detail)"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import {  reactive, onMounted, computed } from 'vue';

const state = reactive({
  message: 'Search/Filter In Table',
  search: '',
});
const props = defineProps({
  seach_mode: {
    type: Boolean,
    default: true
  },
  items: [],
})

const highLight = (text) =>{
  let searchWord = state.search.trim();
  if (searchWord === '') return text;
  if (!text.includes(searchWord)) return text;
  const re = new RegExp(searchWord, 'ig');
  return text.replace(re, function (search) {
    return (
      '<span style="background-color:yellow;font-weight:bold">' + search + '</span>'
    );
  }); 
}
const sortDateAsc = () =>{
  state.items.sort((a, b) => {
    return  (a.date > b.date ? 1 : -1);
  });
}
const sortDateDesc = () =>{
  state.items.sort((a, b) => {
    return  (a.date < b.date ? 1 : -1);
  });
}

const search_items = computed(() => {
  let searchWord = state.search.trim();
  if (searchWord === '') return state.items;
  return state.items.filter((user) => {
    return (
      user.date.includes(searchWord) ||
      user.title.includes(searchWord) ||
      user.detail.includes(searchWord)
    );
  });
});

onMounted(() => {
  state.items = props.items
})

</script>
<style scoped>
  .table-scroll{
    width: 100%;
    overflow: auto;
  }
  table {
    border-collapse: collapse;

  }
  td,
  th {
    text-align: left;
    padding: 8px;
    min-width: 100px;
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
  .title{
    white-space: nowrap;

  }
  input {
    display: block;
    border: 1px solid black;
    width: 30%;
    padding: 4px;
    border-radius: 2px;
    margin-top: 2px;
    margin-left: auto;
    margin-right: 0;
    

  }
</style>
