<template>
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
</template>
<script setup>
const props = defineProps({
  items: {
    type: Array,
  },
})
</script>
>
