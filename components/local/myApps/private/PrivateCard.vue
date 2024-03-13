<script setup>
  import Card        from '@/components/global/cards/Card';
  import Chip        from "@/components/global/tags/Chip";
  import LinkButton from "@/components/global/buttons/LinkButton";
  // import Button   from "@/components/global/buttons/LinkButton";
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
  <Card  class="card">
    <div>{{ props.sub_title }}</div>
    <h2>
          {{ props.main_title }}
    </h2>
    <p>{{ props.period }}</p>
    <div class="my-2" style="width: 375px">
      <Chip
        class="mx-1 mt-1" 
        v-for="(skill, index) in props.skills" :key="index"
        :content="skill" 
      />
    </div>
    <div class="card-explain text-wrap mt-2">
      {{ props.explain }}
    </div>
    <div>
      <LinkButton
        :href ="props.url"
        effect = "btnPush"
        color  = "btnBlueGreen"
      >
        <div v-if = "props.btn === 'link'">link</div>
        <div v-if = "props.btn === 'git'">git</div>
      </LinkButton>
    </div>
  </Card>
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
