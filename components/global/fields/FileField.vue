<script setup lang="ts">
  import { ref } from 'vue';

  //reactive data
  const preview = ref();

  //props
  const props = defineProps({
    id: {
      type: String,
      default: ''
    },
    class: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
  })
  
  //emit
  const emit = defineEmits(['fileData']);
  const getFileData = () => {
      emit('fileData', preview.value.files[0]);
  };
</script>
<template>
  <label>
    <input type ="file"
      :id       = "id"
      :class    = "class"
      :name     = "name"
      ref       = 'preview'
      @change   = "getFileData"
    > 🖇ファイルを選択
  </label>
</template>
<style scoped>
label {
    padding: 10px 40px;
    color: #ffffff;
    background-color: #384878;
    cursor: pointer;
}

input[type="file"] {
    display: none;
}
</style>
