<script setup lang="ts">
  import { ref, onMounted, defineEmits } from 'vue'
  import type { Ref } from 'vue/dist/vue';

  const props = defineProps({
    items: {
      type: Array,
      default: []
    },
    steps: {
      type: Number,
      default: 3
    },
  })

  const page :Ref<number>       = ref(1);
  const totalPages :Ref<number> = ref(0);
  const first :Ref<number>      = ref(0);
  const last :Ref<number>       = ref(0);

  const emits = defineEmits(['handleAction']);

  const pagination = () =>{
    totalPages.value = (props.items.length % props.steps === 0) 
    ? (props.items.length / props.steps) 
    :  Math.floor(props.items.length / props.steps) +1;
    first.value = (page.value - 1) * props.steps;
    last.value  = page.value * props.steps;

    return getArrayRange(first.value, last.value, page.value);
  
    //emits('handleAction', first.value, last.value, page.value);
  }

  const next = () =>{
    if (page.value >= totalPages.value) return;
    page.value = page.value + 1;
    pagination();
  }

  const prev = () => {
    if (page.value <= 1) return;
    page.value = page.value - 1;
    pagination();
  }

  const pushNumper = (num:number) =>{
    page.value = num;
    pagination();
  }

  const getPageClass = (pageNumber: number) => {
    return pageNumber === page.value ? 'current-position' : '';
  };

  // 開始インデックスから終了インデックスまでの要素を抽出する関数
  const getArrayRange = (startIndex: number, endIndex:number, currentPosition:number) => {
    const array =  props.items;
    page.value = currentPosition;

    // 範囲が無効な場合は空の配列を返す
    if (startIndex < 0 || startIndex > endIndex) {
      return [];
    }
    // 配列の一部を抽出して新しい配列として返す
    const resultArray = array.slice(startIndex, endIndex);

    if(resultArray.length>0){
      return emits('handleAction', resultArray);
    }
  };

  onMounted(() => {
    pagination();

  })
</script>

<template>
  <ul class="pagination">
    
      <li id="prev" class="prev" @click="prev()">&lt;</li>
      <li
        v-for="(stepNumber, index) in totalPages" :key="index"
        @click="pushNumper(index+1)"
        :class="getPageClass(stepNumber)"
      >
        {{ stepNumber }}
      </li>
      <li id="next" class="next" @click="next()">&gt; </li>
  </ul>
</template>
<style scoped>
.pagination {
    list-style: none;
}
.pagination li {
    display: inline-block;
    margin: 0 0.5em;
    cursor: pointer;
}
.current-position{
  font-weight: 600;
}
</style>