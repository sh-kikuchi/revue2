<template>
  <!-- <v-container class="mt-4 mb-4"> -->
  <v-row class="pa-4">
    <v-col cols="12" sm="6" order=props.aOrder>
      <v-sheet class="ma-1 pa-1" style="background-color: transparent;">
        <slot name="aSide"></slot>
      </v-sheet>
    </v-col>
    <v-col cols="12" sm="6" order=props.bOrder>
      <v-sheet class="ma-1 pa-1"  style="background-color: transparent;">
        <slot name="bSide"></slot>
      </v-sheet>
    </v-col>
  </v-row>
  <!-- </v-container> -->
</template>
<script setup>
const props = defineProps({
  aOrder: {
    type: String,
    default: "last"
  },
  bOrder: {
    type: String,
    default: "first"
  },
})

</script>
<style scoped>
</style>
