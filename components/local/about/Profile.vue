<script setup>
import 'revuekitz/dist/style.css'
import { ImgIcon } from 'revuekitz'
import Chip   from "@/components/global/displays/Chip.vue";
import Row      from "@/components/global/layouts/grid/Row";
import Column   from "@/components/global/layouts/grid/Column";
import Skills   from '@/assets/json/skill.json';
import portrait from '@/assets/images/about/portrait.png';
import mylogo   from '@/assets/images/logo/s_logo.png';

</script>
<template>
  <section id="profile"  class="py-4">
    <h2 class="text-center pt-3 pb-3 ma-0">Profile</h2>
    <Row>
      <Column :cols="6" :sm_cols="12">
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
          <Chip
            class="mx-1" 
            v-for="(skill, index) in Skills" :key="index"
            :content="skill.content" 
          />
        </div>
      </Column>
      <Column :cols="6" :sm_cols="12">
        <div class="flex justify-center">
          <ImgIcon 
            :imgFile = "portrait"
            size="128" 
          />
       </div>
      </Column>
    </Row>     
  </section>
</template>
<style scoped>
#profile{
  background-color: rgba(221, 136, 116, 0.2);
}
</style>
