<template>
  <section id="timeLine" class="py-2">
    <h2 class="text-center pt-3 pb-3">Relese notes</h2>
    <div class="timeline-wrap">
    <v-timeline direction="vertical" side="end">
      <v-timeline-item v-for="content in state.contents" :key="content" class="overflow-x-auto">
        <template v-slot:opposite>
          {{ content.oppsiteContent }}
        </template>
        <div>
          <div class="text-h6">{{ content.title }}</div>
          <p >
              {{ content.text }}
            </p>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
  </section>
</template>
<script setup>
const state = reactive({
  contents: [
    {
      oppsiteContent: "2023.01",
      title: "Ver2 Relese",
      text: "Nuxt3版をリリースしました。"
    },
    {
      oppsiteContent: "2022.11",
      title: "Vue3,Nuxt3の衝撃",
      text: "OptionsAPIからCompositionAPIに改修。"
    },
    {
      oppsiteContent: "2021.11",
      title: "Re:Vueリリース",
      text: "2021年の後半よりNuxt2で開発を進めてきました。元々はブログを作ろうとしていましたが、気が付けば色々足してました。"
    },

  ]
});
</script>
<style scoped>
#timeLine{
  background-color: rgba(201, 194, 176, 0.2);
}

.timeline-wrap{
  max-width: 800px;
  margin: 0 auto;
}
</style>
