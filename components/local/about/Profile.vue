<script setup>
import 'revuekitz/dist/style.css'
import { ImgIcon,ChipText } from 'revuekitz'
import { GridColumn } from 'revuekitz'
import { GridRow } from 'revuekitz'
import Profile   from '@/assets/json/about/profile.json';
import portrait from '@/assets/images/about/portrait.png';

</script>
<template>
  <section id="profile"  class="py-4">
    <h2 class="text-center pt-3 pb-3 ma-0">Profile</h2>
    <div class="flex justify-center">    
      <div> 
        <div>{{ Profile.basic }}</div>
      </div>
     </div>          
    <GridRow>
      <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
        <div class="text-center mt-3">
          <div class="flex justify-center">
            <div>
              <h4>Study</h4>
              <p class="study-detail">
                {{ Profile.study.description }}
              </p>
              <blockquote class="quote pt-1">
                “{{ Profile.study.quote }}”
                <footer>— {{ Profile.study.quoteAuthor }}</footer>
              </blockquote>

              <p class="study-detail">
                {{ Profile.study.paperLabel }}
              </p>
              <a :href="Profile.study.paperUrl">
                {{ Profile.study.paperTitle }} ({{ Profile.study.paperDate }})
              </a>
            </div>
          </div>
        </div>
      </GridColumn>
      <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
        <div class="text-center mt-3">
          <div class="flex justify-center">
            <div>
                <h4>Job</h4>
              <p class="job-detail">
                {{ Profile.job.description }}
              </p>
              <div class="skill-area">
                <span v-for="(skill, index) in Profile.job.skills" :key="index">
                    <ChipText
                      class="ml-1"
                      :style="'background-color: lightgray; font-size:11px;'"
                      :styleReset="false"
                    >{{ skill.content }}
                    </ChipText>
                  </span>
              </div>
            </div>
          </div>
        </div>
      </GridColumn>
    </GridRow>
            <div class="profile-image-area flex justify-center">
          <ImgIcon 
              :path = "portrait"
              size="128" 
          />
        </div>     
  </section>
</template>
<style scoped>
#profile{
  background-color: rgba(221, 136, 116, 0.2);
}
p{
  padding: 0;
  margin: 0;
  font-size: 13px;
}
.study-detail,
.job-detail{
  margin: 0 auto;
  text-align: left;
  width: 300px;
}
.job-detail{
  padding-bottom: 20px;
}
.quote, a{
  font-size: 13px;
}

.skill-area{
  overflow-x: auto;
  width: 300px;
}

</style>
