<template>
  <div class="markdown">
      <slot></slot>
  </div>
</template>
<style>
a{
  color: black;
  list-style: none;
}
.markdown{
  max-width: 1024px;
  margin: 5px auto;
  padding:25px;
  background-color: whitesmoke;
}
.markdown h3 a{
  color: black;
  text-decoration: none;
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
