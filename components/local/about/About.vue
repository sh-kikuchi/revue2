<script setup>
import 'revuekitz/dist/style.css'
import { ImgIcon } from 'revuekitz'
import { GridColumn } from 'revuekitz'
import { GridRow } from 'revuekitz'
import applogo from '@/assets/images/logo/app_logo.png';
import About from '@/assets/json/about/about.json';
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
                :path = "applogo"
                size="256" 
              />
            </div>
          </div>
        </GridColumn>
        <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
          <div>
            <h3>{{ About.title }}</h3>
          <p>{{ About.text }}</p>
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
