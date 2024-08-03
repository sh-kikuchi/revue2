<script setup>
import { CardFlame,GridRow,GridColumn,ImgIcon,TabPanel } from "revuekitz";
import 'revuekitz/dist/style.css'
import ProjectCard from '@/components/local/projects/ProjectCard.vue';
import ProjectDetails from "@/assets/json/projects/details.json";
import { ref } from 'vue';

const projectCodes = ref(['Ranunculus', 'Gladiolus', 'Dahlia', 'Cosmos']);
</script>

<template>
    <TabPanel
      style="height: 100vh"
      :tabs="projectCodes"
    >
    <template v-slot:[`content${i}`]  v-for="(projectDetail,i) in ProjectDetails" :key="i">
      <div v-if="projectDetail.pjcode===projectCodes[i]">
        <div>{{ projectDetail.description }}</div>
        <ProjectCard
          v-for="(work,i) in projectDetail.works" 
          class="card-content"
          :title="work.title" 
          :pjcode="work.pjcode" 
          :period="work.period"
          :skills="work.skills" 
          :explain="work.explain" 
          :url="work.url" 
          :gitlink="work.gitlink"
          :detaillink="work.detaillink"
        />
      </div>
    </template>
  </TabPanel>
</template>

<style scoped>
.card-content{
  height: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: whitesmoke;
}

</style>
