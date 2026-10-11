<script setup>
  import 'revuekitz/dist/style.css'
  import { CardFlame, PageTitle } from 'revuekitz'
  import { LayoutWrapper } from 'revuekitz'
  import FirstView   from '@/components/local/about/FirstView.vue';
  import About       from '@/components/local/about/About.vue';
  import Contents    from '@/components/local/about/Contents.vue';
  import MyCareers from '@/components/local/about/MyCareers.vue';
  import Profile     from '@/components/local/about/Profile.vue';
  import Information from '@/components/local/about/Information.vue';
</script>
<template>
  <LayoutWrapper>
    <section class="mx-auto background mt-3 mb-3">
      <CardFlame width="100%" height="100%" class="pa-0">
        <FirstView />
        <About />
        <Contents />
        <Profile />
        <MyCareers />
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
.mt-3{
 margin-top: 15px;
}
.mb-3{
 margin-bottom: 15px;
}
.pa-0{
  padding: 0;
}
</style>
