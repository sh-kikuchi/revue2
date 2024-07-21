<script setup>
  import { ref } from 'vue';
  const block = ref({ open: ''});
  const props = defineProps({
    lists :{
      type: Array,
      default: [
        {
          title: 'リスト1',
          items: [
            'aaa', 
            'bbb', 
            'ccc'
          ]
        },
        {
          title: 'リスト2s',
          items: [
            'aaa', 
            'bbb', 
            'ccc'
          ]
        },
      ]
    }
  });

  const open = (value)  =>{
    block.value.open = block.value.open === value ? '' : value;
  };

  const enter = (el, done) => {
    el.offsetHeight; // Trigger reflow
    el.style.transition = 'opacity 0.5s';
    el.style.opacity = 1;
    done();
  };

  const leave = (el, done) => {
    el.style.transition = 'opacity 0.5s';
    el.style.opacity = 0;
    done();
  }
</script>
<template>
  <div
    class="accordion" 
    v-for="(list, index) in props.lists" :key="index">
    <div @click="open(list.title)">
      {{list.title}}
    </div>
    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <ul v-show="block.open === list.title">
        <li v-for="(item, index) in list.items" :key="index">
          {{ item }}
        </li>
      </ul>
    </transition>
  </div>
</template>
<style>
.accordion{
  display: block;
  padding-left: 5px;
  background-color: whitesmoke;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  border-collapse:collapse;
}
.accordion ul li{
  list-style: none;
  padding-right: 5px;
  margin-right: 15px;
  background-color: transparent;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
