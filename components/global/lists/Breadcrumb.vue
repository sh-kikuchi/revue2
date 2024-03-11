<script setup>
</script>
<template>
  <nav>
  <ol class="breadcrumb">
    <li><a href="/">ホーム</a></li>
    <li><a href="/.../">2層目</a></li>
    <li>現在のページ</li>
  </ol>
</nav>
</template>
<style scoped>
  .breadcrumb {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }

  .breadcrumb li:not(:last-of-type)::after {
    content: "/";
    margin: 0 .6em; /* 記号の左右の余白 */
    color: #777; /* 記号の色 */
  }

</style>