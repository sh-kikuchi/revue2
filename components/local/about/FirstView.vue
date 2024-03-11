<script setup>
import Row   from "@/components/global/layouts/grid/Row";
import Column   from "@/components/global/layouts/grid/Column";
</script>
<template>
  <section id="firstView">
    <Row style="width: 250px; display: flex; justify-content: center;">
      <Column>
        <div >
          <img class="dp-block mx-auto" src="@/assets/images/logo/s_logo.png" alt="logo" style="width:50px; height:50px;">
          <div class="text-center google-font">Re:Vue</div>
          <ul class="menu text-center google-font">
            <li class="google-font"><a href="">01_What's Re:Vue?</a></li>
            <li class="google-font"><a href="">02_Contents</a></li>
            <li class="google-font"><a href="">03_Release Notes</a></li>
            <li class="google-font"><a href="">04_Profile</a></li>
            <li class="google-font"><a href="">05_Information</a></li>
          </ul>
        </div>
      </Column>
      <Column></Column>
    </Row>     
  </section>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Allura&family=Anton&family=Rock+Salt&family=Teko:wght@400&display=swap');

.menu li {
  color: black;
  list-style: none;
}

.google-font {
  list-style: none;
  font-family: 'Allura',
    cursive;
  font-family: 'Anton',
    sans-serif;
  font-family: 'Rock Salt',
    cursive;
  font-family: 'Teko',
    sans-serif;
}

section {
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  background-image: url('@/assets/images/about/akita_winter.jpg');
  background-size: cover;
  mix-blend-mode: darken;
}
</style>
