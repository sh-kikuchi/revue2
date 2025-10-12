
<template>
  <main>
      <ContentDoc v-slot="{ doc }">
        <div class="title mx-auto">
          <h1>{{ doc.title }}</h1>
        </div>
        <ContentRenderer :value="doc" />
      </ContentDoc>
  </main>
</template>
<style scoped>
.title{
  text-align: center;
  max-width:800px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: white;
}
</style>
