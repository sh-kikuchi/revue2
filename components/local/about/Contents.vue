<script setup>
import 'revuekitz/dist/style.css'
import { GridColumn } from 'revuekitz'
import { GridRow } from 'revuekitz'
import { AccordionMenu } from 'revuekitz'
import Contents from '@/assets/json/about/contents.json'
</script>
<template>
  <section id="contents">
    <h2 class="text-center pt-3 pb-3 ma-0"> {{ Contents.sectionTitle }}</h2>
    <div class="pa-4">
      <GridRow>
         <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
          <AccordionMenu :lists="Contents.lists" />
        </GridColumn>
        <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
          <div>
            <p class="text-center"> {{ Contents.mainDescription }}</p>
            <img src="~/assets/images/about/vampire2.png" class="d-block mx-auto" style="width:50%">
          </div>
        </GridColumn>
      </GridRow>     
    </div>
    <div class="pa-4">
      <GridRow>
        <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
          <p class="text-center">  {{ Contents.subDescription }}</p>
          <img src="~/assets/images/about/vampire3.png" class="d-block mx-auto" style="width:50%">
        </GridColumn>
        <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
           <AccordionMenu :lists="Contents.lists2" />
        </GridColumn>
      </GridRow>
    </div>    
  </section>
</template>
<style scoped>
#contents{
  background-color: rgba(252, 242, 221, 0.2);
}
</style>
