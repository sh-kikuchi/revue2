<template>
  <section id="firstView">
    <v-row align-content="center">
      <v-col col="6" class="mx-auto d-flex justify-center">
        <div>
          <img class="d-block mx-auto" src="@/assets/images/logo/s_logo.png" alt="logo" style="width:50px; height:50px;">
          <div class="text-center google-font">Re:Vue</div>
          <ul class="menu text-center google-font">
            <li class="google-font"><a href="">01_What's Re:Vue?</a></li>
            <li class="google-font"><a href="">02_Contents</a></li>
            <li class="google-font"><a href="">03_Release Notes</a></li>
            <li class="google-font"><a href="">04_Profile</a></li>
            <li class="google-font"><a href="">05_Information</a></li>
          </ul>
        </div>
      </v-col>
      <v-col col="6"></v-col>
    </v-row>
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
