<script setup>
  import { ref, onMounted, defineEmits } from 'vue'
  const props = defineProps({
    itemLength: {
      type: Number,
      default: 16
    },
    steps: {
      type: Number,
      default: 3
    },
   
  })

  const page = ref(1);
  const totalPages = ref(1);
  const first = ref(0);
  const last = ref(0);

  const emits = defineEmits(['handleAction']);

  const pagination = () =>{
    totalPages.value = (props.itemLength % props.steps === 0) 
    ? (props.itemLength / props.steps) 
    :  Math.floor(props.itemLength / props.steps) +1;

    first.value = (page.value - 1) * props.steps + 1;
    last.value  = page.value * props.steps;

    return emits('handleAction', first.value, last.value );

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

  onMounted(() => {
    pagination();
  })

</script>

<template>
  <ul class="pagination">
      <li id="prev" @click="prev()">&lt;</li>
      <li v-for="(page, index) in totalPages" :key="index">{{ page }}</li>
      <li id="next" @click="next()">&gt; </li>
  </ul>
</template>
<style>
.menu_list {
    height: 150px;
}

.pagination {
    list-style: none;
}

.pagination li {
    display: inline-block;
    margin: 0 0.5em;
    cursor: pointer;
}
</style>