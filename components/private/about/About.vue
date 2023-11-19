<template>
  <section id="about">
    <h2 class="text-center pt-3 pb-3">What's Re:Vue?</h2>
    <Grid aOrder="first" bOrder="last">
      <template v-slot:aSide>
        <div class="article-header">
          <div width="300" class="text-center">
            <v-avatar size="150" tile>
              <img src="@/assets/images/logo/r_logo.png" alt="logo" style="width:150px; height:150px;" />
            </v-avatar>
          </div>
        </div>
      </template>
      <template v-slot:bSide>
        <h3>Re:vue[rivjúː]</h3>
        <p>【1】プログラミングで学習してきたことを振り返るアウトプットの場。【2】サイト制作者のVue.js（Nuxt.js）の学習スペース。「壮大な実験」（The Grand Experiments）と誇張しつつも、Vue.js/Nuxt.jsの可能性を見出すための実験要素が盛りだくさんのコンテンツとなっている。<small>(Update 2022/12/24 23:52)</small></p>
      </template>
    </Grid>
  </section>
</template>
<script setup>
import Grid from "@/components/public/atoms/layouts/Grid.vue";
</script>
<style scoped>
#about {
  background-color: rgba(131,
      186,
      185, 0.2);
}
</style>
