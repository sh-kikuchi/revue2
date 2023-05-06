<template>
  <PageTitle title="My Apps" />
  <Wrapper>
    <div id="myApps">
        <v-card class="mb-3 mx-2">
          <v-tabs v-model="tab" bg-color="dark">
            <v-tab value="private">Private</v-tab>
          </v-tabs>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="private">
                <Private />
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
    </div>
  </Wrapper>

</template>
<script setup>
import PageTitle from "~~/components/commons/PageTitle.vue";
import Wrapper from "~~/components/commons/Wrapper.vue";
import Private from "~~/components/myApps/private/Private.vue";
const tab = ref(null);
</script>
<style>
</style>
