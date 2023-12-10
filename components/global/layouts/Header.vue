<template>
  <header>
    <slot></slot>
  </header>
</template>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 65px;
  padding: 5px;
  background-color: rgb(225, 231, 238);
  align-items: center;
  /* position: fixed; */
}


</style>