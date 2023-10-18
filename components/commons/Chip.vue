<template>
<span class="chip" :style="chipStyle">
  <div class="chip-content">{{ props.content }}</div>
  <!-- <div class="chip-close">
      <svg class="chip-svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
  </div> -->
</span>
</template>
<script setup>

import { computed } from 'vue';

// const state = reactive({
//   message: 'Search/Filter In Table',
//   search: '',
// });
const props = defineProps({
  fontColor: {
    type: String,
    default:'white'
  },
  backgroundColor: {
    type: String,
    default:'blue'
  },
  content:  {
    type: String,
    default:'Chip-Content'
  },
})

const chipStyle = computed(() => {
  return `
    color: ${props.fontColor}
    background-color: ${props.backgroundColor}`;
});
// const sortDateDesc = () =>{
//   state.items.sort((a, b) => {
//     return  (a.date < b.date ? 1 : -1);
//   });
// }

// const search_items = computed(() => {
//   let searchWord = state.search.trim();
//   if (searchWord === '') return state.items;
//   return state.items.filter((user) => {
//     return (
//       user.date.includes(searchWord) ||
//       user.title.includes(searchWord) ||
//       user.detail.includes(searchWord)
//     );
//   });
// });

// onMounted(() => {
//   state.items = props.items
// })

</script>
<style scoped>
.chip{
    display: inline-flex;
    flex-direction: row;
    background-color: #e5e5e5;
    border: none;
    cursor: default;
    height: 36px;
    outline: none;
    padding: 0;
    font-size: 14px;
    font-color: #333333;
    font-family:"Open Sans", sans-serif;
    white-space: nowrap;
    align-items: center;
    border-radius: 16px;
    vertical-align: middle;
    text-decoration: none;
    justify-content: center;
}
.chip-head{
    display: flex;
    position: relative;
    overflow: hidden;
    background-color: #32C5D2;
    font-size: 1.25rem;
    flex-shrink: 0;
    align-items: center;
    user-select: none;
    border-radius: 50%;
    justify-content: center;
    width: 36px;
    color: #fff;
    height: 36px;
    font-size: 20px;
    margin-right: -4px;
}
.chip-content{
    cursor: inherit;
    display: flex;
    align-items: center;
    user-select: none;
    white-space: nowrap;
    padding-left: 12px;
    padding-right: 12px;
}
.chip-svg{
        color: #999999;
    cursor: pointer;
    height: auto;
    margin: 4px 4px 0 -8px;
  fill: currentColor;
    width: 1em;
    height: 1em;
    display: inline-block;
    font-size: 24px;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    user-select: none;
    flex-shrink: 0;
}
.chip-svg:hover{
    color: #666666;
}
</style>
