<script setup lang="ts">
  import { ref } from 'vue';
  const props = defineProps({
    items: {
      type: Array,
      default: [
        {
          id: '1',
          title: 'Item #1',
          value: 1,
          href:'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice'
        },
        {
          id: '2',
          title: 'Item #2',
          value: 2,
        },
        {
          id: '3',
          title: 'Item #3',
          value: 3,
        },
      ]
    }
  })
  const items = ref<object[]>(props.items);

  const deleteItem = (index) =>{
    items.value.splice(index, 1);
  }

</script>
<template>
  <ul 
    v-for="(item, index) in items" :key="item.id"
  >
    <li 
      class="list-item" @click="$emit('update:value', item.value)"
     
    >
      <div>
        <a v-if="item.hasOwnProperty('href')" :href="item.href">{{ item.title }}</a>
        <span v-else>{{ item.title }}</span>
      </div>
      <div>
        <div @click="deleteItem(index)">&times;</div>
      </div>
    
    </li>
  </ul>

</template>
<style scoped>
ul {
  padding:0; /*デフォルトの指定解除*/
  border:3px solid #ffffff; /*ul全体の境界線を指定*/
  background: whitesmoke; /*背景色を指定*/
}
li {
  padding:10px; /*liの余白指定*/
  list-style-type: none;
}
li:hover {
  background: lightgrey; /*背景色を指定*/
}
li:last-child {
  border-bottom:none; /*最後のliだけborderを非表示に*/
}

.list-item{
  display: flex;
  justify-content: space-between;
}
</style>