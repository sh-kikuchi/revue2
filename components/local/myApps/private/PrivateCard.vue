<script setup>
  import 'revuekitz/dist/style.css'
  import { LinkButton, CardFlame, ChipText } from 'revuekitz'
  import Chip        from "@/components/global/displays/Chip";

  const props = defineProps({
    sub_title: {
      type: String,
    },
    main_title: {
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
  })
</script>
<template>
  <CardFlame  class="card">
    <div>{{ props.sub_title }}</div>
    <h2>
          {{ props.main_title }}
    </h2>
    <p>{{ props.period }}</p>
    <div class="my-2" style="width: 375px">
      <span  v-for="(skill, index) in props.skills" :key="index">
        <ChipText
          id="chipTextId"
          class="chip-text-class"
          :style="'background-color: lightgray;'"
          :styleReset="false"
        >
          {{ skill }}
        </ChipText>
      </span>
    </div>
    <div class="card-explain text-wrap mt-2">
      {{ props.explain }}
    </div>
    <div>
      <LinkButton
        :href ="props.url"
        :style="{ margin:'10px', color:'white',backgroundColor: 'tomato', TextDecoder:'none' }"
      >
        <div v-if = "props.btn === 'link'">link</div>
        <div v-if = "props.btn === 'git'">git</div>
      </LinkButton>
    </div>
  </CardFlame>
</template>
<style scoped>
.card{
  min-height: 350px;
  padding: 8px;
  margin-right: 20px;
  margin-left: 20px;
}
.card-explain{
  font-size: 0.7rem;
  width: 300px;
}
</style>
