<!-- Don't move this file on directory -->
<template>
  <main>
      <ContentDoc v-slot="{ doc }">
        <v-card class="text-center mx-auto mt-5" style="width:800px">
          <h1>{{ doc.title }}</h1>
          <v-divider></v-divider>
          <h3>{{ doc.description }}</h3>
        </v-card>
        <ContentRenderer :value="doc" />
      </ContentDoc>
  </main>
</template>
<style scoped>
</style>
