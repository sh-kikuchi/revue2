<script setup lang="ts">
import { BasicButton } from "revuekitz";
const goBack = () => {
  window.history.back();
};
</script>
<template>
  <div class="markdown">
    <div><BasicButton @click="goBack">戻る</BasicButton></div>
    <slot></slot>
  </div>
</template>
<style>
a {
  color: black;
  list-style: none;
}
.markdown {
  max-width: 1024px;
  margin: 5px auto;
  padding: 25px;
  background-color: whitesmoke;
}
.markdown h3 a {
  color: black;
  text-decoration: none;
}

.markdown pre {
  padding: 10px;
  background-color: #282a36;
  color: #f8f8f2;
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  overflow-x: auto;
}

.markdown li {
  margin-left: 30px;
}

.markdown pre code {
  color: inherit;
  background-color: transparent;
}

.markdown :not(pre) > code {
  color: red;
  background-color: lightgray;
  padding: 2px 4px;
  border-radius: 3px;
}
</style>
