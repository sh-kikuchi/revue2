<script setup>
import { ref } from 'vue';
import { LayoutWrapper, PageTitle, CardFlame,GridRow,GridColumn,ImgIcon,TabPanel } from "revuekitz";
import 'revuekitz/dist/style.css'
import ProjectCard from '@/components/local/projects/ProjectCard.vue';
import ProjectDetails from "@/assets/json/projects/details.json";

const projectCodes = ref(['Ranunculus', 'Gladiolus', 'Dahlia', 'Cosmos']);

</script>
<template>
  <PageTitle class="propject-page-title">Projects</PageTitle>
  <LayoutWrapper width="860px">
    <div style="display:flex; justify-content: center;">

      <TabPanel
      style="height: 100vh"
      :tabs="projectCodes"
      >
        <template v-slot:[`content${i}`]  v-for="(projectDetail,i) in ProjectDetails" :key="i">

          <div class="tab-content" v-if="projectDetail.pjcode===projectCodes[i]">
            <!-- <div class="project-code-description">{{ projectDetail.description }}</div> -->
            <ProjectCard
              v-for="(work,i) in projectDetail.works" 
              class="propject-card-content"
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
    </div>
  </LayoutWrapper>
</template>
<style >
@import url("https://fonts.googleapis.com/css2?family=Allura&family=Anton&family=Rock+Salt&family=Teko:wght@500&display=swap");

.propject-page-title{
  font-family: "Rock Salt", cursive;
}
.project-code-description{

  text-align: center;
  word-break: break-all;
}
.propject-card-content{

  width: 100%;
  height: 100%;
  margin: 0;
 
  background-color: whitesmoke;
}
.revuekitz-tab-panel>div{
  padding: 0 !important;
}


</style>
