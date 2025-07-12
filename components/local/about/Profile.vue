<script setup>
import 'revuekitz/dist/style.css'
import { ImgIcon,ChipText } from 'revuekitz'
import { GridColumn } from 'revuekitz'
import { GridRow } from 'revuekitz'
import Skills   from '@/assets/json/skill.json';
import portrait from '@/assets/images/about/portrait.png';
import mylogo   from '@/assets/images/logo/s_logo.png';

</script>
<template>
  <section id="profile"  class="py-4">
    <h2 class="text-center pt-3 pb-3 ma-0">Profile</h2>
    <GridRow>
      <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
        <div class="text-center mt-3">
          <div class="flex justify-center">
            <span>
              <ImgIcon 
                :imgFile = "mylogo"
                size="18" 
              />
            </span>
            きくち/kikuchi
          </div>
          <p class="text-center pt-2">1994.7.26/B型/獅子座</p>
          <h3 class="text-center text-h6">Skills</h3>
          <span  v-for="(skill, index) in Skills" :key="index">
            <ChipText
              :style="'background-color: lightgray;'"
              :styleReset="false"
            >{{ skill.content }}
          </ChipText>
          </span>
        </div>
      </GridColumn>
      <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
        <div class="flex justify-center">
          <ImgIcon 
            :imgFile = "portrait"
            size="128" 
          />
       </div>
      </GridColumn>
    </GridRow>     
  </section>
</template>
<style scoped>
#profile{
  background-color: rgba(221, 136, 116, 0.2);
}
</style>
