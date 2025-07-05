<script setup>
  import {CardFlame,GridRow,GridColumn,ImgIcon,LinkButton,ChipText } from "revuekitz";
  import 'revuekitz/dist/style.css'
  const props = defineProps({
    title: {
      type: String,
    },
    pjcode: {
      type: String,
    },
    explain: {
      type: String,
    },
    skills: {
      type: Array,
    },
    url: {
      type: String,
    },
    btn: {
      type: String,
    },
    period: {
      type: String,
    },
    gitlink:{
      type: String,
    },    
    detaillink:{
      type: String,
    }
  })

</script>
<template>
  <section>
    <h3>{{props.pjcode}}</h3>
    <CardFlame
      class="project-card"
      :title="props.title"
     >
      <GridRow>
        <GridColumn :sm_cols="12" :cols="12" :lg_cols="6" >
          <div>{{ props.period }}</div>
          <hr>
          <div>{{ props.explain }}</div>
        </GridColumn>
        <GridColumn class="card-right" :sm_cols="12" :cols="12":lg_cols="6">
          <div class="skillset-content">
            <div class="skillset-content-title">skillset</div>
            <div class="chip-text-area" >
              <div v-for="(skill, index) in props.skills" :key="index">
                <ChipText
                  id="chipTextId"
                  class="chip-text-class"
                  :style="'margin-right:5px; background-color: lightgray;'"
                >
                  {{ skill }}
                </ChipText>
              </div>
            </div>
          </div>
          <div class="action-area">         
            <LinkButton 
             :style="{ margin:'10px', color:'white',backgroundColor: 'tomato', TextDecoder:'none' }"
            > <NuxtLink :to="props.detaillink" class="nuxt-link">Detail</NuxtLink>    
            </LinkButton>
          
          </div>
        </GridColumn>
      </GridRow>
    </CardFlame>
  </section>
</template>
<style scoped>
.project-card{
  width: auto;
  margin: 0;
  position: relative;
  background-color: whitesmoke;
  margin-bottom: 5px;
}

/* Card-Right */
.skillset-content{

  padding: 5px;
}
.skillset-content-title{
  text-align: center;
}
.chip-text-area{
  display: flex;
  justify-content: center;
  margin: 5px;
}
.link-button{
  width: 100%;
}
.nuxt-link{
  text-decoration:none;
  color: whitesmoke;
}
.action-area{
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 5px; 
}
</style>
