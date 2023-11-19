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
          <h3 class="text-center text-h6">Skills</h3>
          <Chip
            class="mx-1" 
            v-for="(skill, index) in Skills" :key="index"
            :content="skill.content" 
          />

        </div>
      </template>
      <template v-slot:bSide>
        <div class="article-header">
          <div width="300" class="text-center">
            <Avatar :imgFile = portrait />
          </div>
        </div>
      </template>
    </Grid>
  </section>
</template>
<script setup>
import Avatar from "@/components/public/atoms/images/Avatar.vue";
import Grid   from "@/components/public/atoms/layouts/Grid.vue";
import Chip   from "@/components/public/atoms/layouts/Chip.vue";
import Skills from '@/assets/json/skill.json';
import portrait from '@/assets/images/about/portrait.png'
</script>
<style scoped>
#profile{
  background-color: rgba(221, 136, 116, 0.2);
}
</style>
