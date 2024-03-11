<script setup>
import PageTitle from "@/components/global/layouts/PageTitle.vue";
import Wrapper   from "@/components/global/layouts/Wrapper.vue";
import Private   from "@/components/local/myApps/private/Private.vue";
</script>
<template>
  <PageTitle title="My Apps" />
  <Wrapper>
    <div id="myApps">
      <Private />
    </div>
  </Wrapper>
</template>
<style scoped>
</style>
