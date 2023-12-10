<template>
  <div class="navigation" id="list-navigation" v-show="props.isVisible" @click="close"></div>
  <div class="navigation-content" v-show="props.isVisible">
       <slot></slot>
  </div>
</template>
<script setup>
import { reactive } from "vue";

const state = reactive({
  message: "TEST",
});

const props = defineProps({
  isVisible: {
    required: true,
    type: Boolean,
    default: false,
  },
  navigationItem: {
    required: true,
    type: Object,
    default: false,
  }
});

const emits = defineEmits(['close']);
const close = () => {
  emits('close');
}

</script>
<style scoped>
/*モーダルのタイトル*/

img {
  display: block;
  width: 150px;
  margin: 10px auto;
}
.navigation {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-start; 
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.navigation-content {
  width: 70px;  /**のちに自由に変えられるようにする */
  height: 100vh;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: top;
  background-color: white;
  justify-content: center;
  z-index: 999;
}
</style>
