<script setup>
  const props = defineProps({
    count: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 200
    },
    tabs: {
      type: Array,
      default: ['apple','banana']
    },
  })
  const show = ref(0);
  const select = (num) => {
    show.value = num;
  }
  const tabStyle = computed(() => {
    return `width: ${props.width}px`;
  });
</script>
<template>
   <div class="tabgroup">
    <ul class="tabnav" :style="tabStyle">
      <li 
        @click="select(tabIndex)" 
        :class="{'active': show == tabIndex }" 
        v-for="(tab,tabIndex) in props.tabs"
      >
        {{ tab }}
      </li>
    </ul>
    <div class="tabcontent">
      <div v-for="(tab,contentIndex) in props.tabs">
        <div v-if="show == contentIndex " class="tabcontent-list">
           <slot :name="'content' + contentIndex"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
ul{
  padding: 0;
}
.tabnav {
  margin: auto;
  display: flex;
  list-style-type: none;
}
.tabnav li {
  cursor: pointer;
  width: 50%;
  background: #ddd;
  color: #333;
  padding: 10px;
  text-decoration: none;
}
.tabnav li.active {
  background: #405dca;
  color: #fff;
}
.tabcontent {
  padding: 20px;
  border: 1px dotted #ccc;
}
</style>
