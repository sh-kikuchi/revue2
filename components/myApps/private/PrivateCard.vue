<template>
  <v-card class="mx-auto" min-height="300">
    <v-card-text>
      <v-sheet class="ma-1 pa-1">
        <div>{{ props.sub_title }}</div>
        <p class="text-h4 text--primary">
              {{ props.main_title }}
          </p>
        <p>{{ props.period }}</p>
        <div class="d-flex flex-wrap">
          <div v-for="(skill, i) in props.skills" :key="i">
            <v-chip class="ma-1">{{ skill }}</v-chip>
          </div>
        </div>
        <div class="text--primary mt-2">
          {{ props.explain }}<br>
        </div>
          <v-btn
            class="mx-1 my-2 d-none d-md-inline"
            variant="flat"
            @click="dialog = true">
          image
          </v-btn>
          <v-btn
            v-if="props.sub_title==='Legacy'"
              color="primary mx-1 my-2"
              variant="flat"
              :href ="props.url"
              target="_blank">
              <v-icon>mdi-git</v-icon>
          </v-btn>
          <v-btn
            v-if="props.sub_title==='Portfolio'"
              class="mx-1 my-2"
              variant="outlined"
              color="indigo"
              :href ="props.url"
              target="_blank">
              <v-icon>mdi-link</v-icon>
          </v-btn>
      </v-sheet>
      <v-dialog v-model="dialog" max-width="860" max-height="610">
        <v-card>
          <v-card-text>
            <v-carousel :show-arrows="false">
              <v-carousel-item v-for="(image, i) in props.images" :key="i">
                <img :src="image">
              </v-carousel-item>
            </v-carousel>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>
<script setup>
const reveal = ref(false);
const dialog = ref(false);
const props = defineProps({
  sub_title: {
    type: String,
  },
  main_title: {
    type: String,
  },
  explain: {
    type: String,
  },
  skills: {
    type: Array,
  },
  images: {
    type: Array,
  },
  url: {
    type: String,
  },
  period: {
    type: String,
  },
})
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
img{
 width: 100%;
 height: 90%;
 /* object-fit: cover; */
}
</style>
