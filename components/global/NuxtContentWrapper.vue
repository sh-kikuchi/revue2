<template>
  <div class="markdown">
      <slot></slot>
  </div>
</template>
<style >
.markdown{
  max-width: 1024px;
  margin: 50px auto;
  padding:50px;
  background-color: whitesmoke;
}

.markdown pre{
  padding: 5px;
  background-color: black;
  margin-top:5px;
  margin-bottom:10px;
  overflow-x: auto;
}

.markdown li{
  margin-left: 30px;
}

.markdown code{
  color: red;
  background-color: lightgray;
}
</style>
