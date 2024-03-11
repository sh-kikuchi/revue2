<!-- Don't move this file on directory -->
<template>
  <main>
      <ContentDoc v-slot="{ doc }">
        <div class="title text-center mx-auto mx-5 mt-5">
          <h1>{{ doc.title }}</h1>
          <hr />
          <h3>{{ doc.description }}</h3>
        </div>
        <ContentRenderer :value="doc" />
      </ContentDoc>
  </main>
</template>
<style scoped>
.title{
  max-width:800px;
  background-color: white;

}
</style>
