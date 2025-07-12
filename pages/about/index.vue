<script setup>
  import 'revuekitz/dist/style.css'
  import { CardFlame, PageTitle } from 'revuekitz'
  import { LayoutWrapper } from 'revuekitz'
  import FirstView   from '@/components/local/about/FirstView.vue';
  import About       from '@/components/local/about/About.vue';
  import Contents    from '@/components/local/about/Contents.vue';
  import ReleseNotes from '@/components/local/about/ReleseNotes.vue';
  import Profile     from '@/components/local/about/Profile.vue';
  import Information from '@/components/local/about/Information.vue';
</script>
<template>
  <PageTitle>What's Re:Vue?</PageTitle>
  <LayoutWrapper>
    <section class="mx-auto background mb-3">
      <CardFlame width="100%" height="100%" class="pa-0">
        <FirstView />
        <About />
        <Contents />
        <ReleseNotes />
        <Profile />
        <Information />
      </CardFlame>
    </section>
  </LayoutWrapper>
</template>
<style scoped>
.background{
  background-image: url("@/assets/images/about/bg.gif");
  background-repeat: repeat;
}
.mb-3{
 margin-bottom: 15px;
}
.pa-0{
  padding: 0;
}
</style>
