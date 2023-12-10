<template>
  <PageTitle title="What's Re:Vue?" />
  <Wrapper>
    <section class="mx-auto background mb-3">
      <Card width="100%" height="100%">
        <FirstView />
        <About />
        <Contents />
        <TimeLine />
        <Profile />
        <Information />

      </Card>
    </section>
  </Wrapper>
</template>
<script setup>
import Wrapper     from '@/components/global/layouts/Wrapper.vue';
import PageTitle   from '@/components/global/layouts/PageTitle.vue';
import FirstView   from '@/components/local/about/FirstView.vue';
import About       from '@/components/local/about/About.vue';
import Profile     from '@/components/local/about/Profile.vue';
import Contents    from '@/components/local/about/Contents.vue';
import TimeLine    from '@/components/local/about/TimeLine.vue';
import Information from '@/components/local/about/Information.vue';
import { ref } from 'vue';
const dialog = ref(false);
</script>
<style scoped>

.background{
  background-image: url("@/assets/images/about/bg.gif");
  background-repeat: repeat;
}
.mb-3{
 margin-bottom: 15px;
}
</style>
