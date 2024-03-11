
<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount } from '@mdi/js';
const props = defineProps({
  path: {
    required: true,
    type: String,
    default: mdiAccount,
  },
  size: {
    required: true,
    type: Number,
    default: 8, //128 64 32 18
  },
});
</script>
<template>
  <svg-icon type="mdi" 
    class="mdi-icon"
    :path="props.path"
    :width=props.size
    :height="props.size"
  ></svg-icon>
</template>
<style>
.mdi-icon{
  margin: 0 auto;
}
</style>


