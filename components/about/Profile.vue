<template>
  <section id="profile"  class="py-4">
    <h2 class="text-center pb-3">Profile</h2>
    <Grid aOrder="first" bOrder="last">
      <template v-slot:aSide>
        <div width="300" class="text-center mt-3">
          <v-avatar size="50"><img src="@/assets/images/logo/s_logo.png" alt="logo" style="width:50px; height:50px;" /></v-avatar>
          <span class="text-center">きくち/kikuchi</span>
          <!-- <p class="text-center pt-2">平成最初の戌/誕生花はブーゲンビリア</p> -->
          <p class="text-center pt-2">1994.7.26/B型/獅子座</p>
          <div class="text-center">4年ほどエンジニアをやってます。</div>
          <h3 class="text-center text-h6">Skills</h3>
          <div class="pg-lang text-center">
            <v-chip class="mt-1">
              <span>
                <font-awesome-icon :icon="['fab', 'html5']" />HTML5
              </span>
            </v-chip>
            <v-chip class="mt-1">
              <span>
                <font-awesome-icon :icon="['fab', 'css3']" />CSS3
              </span>
            </v-chip>
            <v-chip class="mt-1">
              <span>
                <font-awesome-icon :icon="['fab', 'js']" />JavaScript/jQuery
              </span>
            </v-chip>
            <v-chip class="mt-1">
              <span>
                <font-awesome-icon :icon="['fab', 'php']" />PHP7-8
              </span>
            </v-chip>
            <v-chip class="mt-1">
              <span>
                <font-awesome-icon :icon="['fab', 'laravel']" />Laravel(5.5-9)
              </span>
            </v-chip>
            <v-chip class="mt-1">
              <span>
                <font-awesome-icon :icon="['fab', 'bootstrap']" />Bootstrap
              </span>
            </v-chip>
            <v-chip class="mt-1">
              <span>
                <font-awesome-icon icon="database" />MySQL
              </span>
            </v-chip>
            <v-chip class="mt-1">
              <span>
                <font-awesome-icon icon="database" />SQLserver
              </span>
            </v-chip>
            <v-chip class="mt-1">
              <span>
                <font-awesome-icon icon="database" />PostgresQL
              </span>
            </v-chip>
            <v-chip class="mt-1">
              <span>
                <font-awesome-icon :icon="['fab', 'vuejs']" />Vue.js
              </span>
            </v-chip>
            <v-chip class="mt-1">
              <span>
                <font-awesome-icon :icon="['fab', 'vuejs']" />Nuxt.js(2.x)
              </span>
            </v-chip>
            <v-chip class="mt-1">
              <span>
                <font-awesome-icon :icon="['fab', 'markdown']" />Markdown
              </span>
            </v-chip>
            <v-chip class="mt-1">
              <span>
                <font-awesome-icon :icon="['fab', 'js']" />Express.js
              </span>
            </v-chip>
          </div>
        </div>
      </template>
      <template v-slot:bSide>
        <div class="article-header">
          <div width="300" class="text-center">
            <v-avatar size="150" tile>
              <img src="@/assets/images/about/portrait.png" alt="logo" style="width:150px; height:150px;" />
            </v-avatar>
          </div>
        </div>
      </template>
    </Grid>
  </section>
</template>
<script setup>
import Grid from "~~/components/commons/Grid.vue";
</script>
<style scoped>
#profile{
  background-color: rgba(221, 136, 116, 0.2);
}
</style>
