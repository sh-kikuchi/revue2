<script setup>
import 'revuekitz/dist/style.css'
import { ImgIcon } from 'revuekitz'
import { GridColumn } from 'revuekitz'
import { GridRow } from 'revuekitz'
import applogo   from '@/assets/images/logo/r_logo.png';
</script>
<template>
  <section id="about">
    <h2 class="text-center pt-3 pb-3 ma-0">What's Re:Vue?</h2>
    <div class="pa-4">
      <GridRow>
        <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
          <div class="article-header">
            <div class="flex justify-center">
              <ImgIcon 
                :imgFile = "applogo"
                size="128" 
              />
            </div>
          </div>
        </GridColumn>
        <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
          <div>
            <h3>Re:vue[rivjúː]</h3>
          <p>【1】プログラミングで学習してきたことを振り返るアウトプットの場。【2】サイト制作者のVue.js（Nuxt.js）の学習スペース。「壮大な実験」（The Grand Experiments）と誇張しつつも、Vue.js/Nuxt.jsの可能性を見出すための実験要素が盛りだくさんのコンテンツとなっている。<small>(Update 2022/12/24 23:52)</small></p>
          </div>
        </GridColumn>
      </GridRow>     
    </div>
  </section>
</template>
<style scoped>
#about {
  background-color: rgba(131,
      186,
      185, 0.2);
}
</style>
