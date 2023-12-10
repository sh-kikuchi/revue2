<template>
  <PageTitle title="My Apps" />
  <Wrapper>
    <div id="myApps">
        <v-card class="mb-3 mx-2">
          <v-tabs v-model="tab" bg-color="dark">
            <v-tab value="local">Private</v-tab>
          </v-tabs>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="local">
                <Private />
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
    </div>
  </Wrapper>

</template>
<script setup>
import PageTitle from "@/components/global/layouts/PageTitle.vue";
import Wrapper   from "@/components/global/layouts/Wrapper.vue";
import Private   from "@/components/local/myApps/private/Private.vue";
const tab = ref(null);
</script>
<style>
</style>
