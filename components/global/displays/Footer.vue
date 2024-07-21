<template>
<footer class="text-white">
  2021-{{ new Date().getFullYear() }}-<strong>Re:Vue</strong>
</footer>
</template>
<style>
footer{
  display: block;
  width: 100%;
  height:40px;
  background-color: rgb(62, 60, 65);
  bottom: 0; /*下に固定*/
  text-align: center;
  align-items: center;
}
</style>