<script setup lang="ts">
import { useRoute } from 'vue-router'
import DigLiveTemplate from "@/components/local/projects/DigLiveTemplate.vue"
import GhostPhpTemplate from "@/components/local/projects/GhostPhpTemplate.vue"
import RevueKitzTemplate from "@/components/local/projects/RevueKitzTemplate.vue"
import CosmosTemplate from "@/components/local/projects/CosmosTemplate.vue"

const route = useRoute()
const pathParam = route.params.pjcode as string
</script>

<template>
  <div class="project-page">
    <RevueKitzTemplate v-if="pathParam === 'revuekitz'"/>
    <GhostPhpTemplate v-else-if="pathParam === 'ghostphp'"/>
    <DigLiveTemplate v-else-if="pathParam === 'diglive'"/>
    <CosmosTemplate v-else-if="pathParam === 'cosmos'"/>
    <div v-else>ページが表示できません</div>
  </div>
</template>

<style scoped>
.project-page {
  max-width: 860px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
  background: #fff;
  color: #333;
}
</style>
