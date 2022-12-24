<template>
  <v-row align="center" class="first-view first-view-sp">
    <v-col cols="12" sm="8" md="6">
      <div class="top-title">
        <h5 class="my-0">The Grand</h5>
        <h2>Experiments</h2>
        <hr class="border" />
        <div>
          <div class="title-summery">
            Re:Vue is my anthology that expresses what I've learned from
            Information Technology.
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script setup>
// function enableCustomLayout() {
//   setPageLayout('custom')
// }
definePageMeta({
  layout: 'default',
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Allura&family=Anton&family=Rock+Salt&family=Teko:wght@500&display=swap");

.first-view {
  position: relative;
  background-color: rgb(183, 204, 219);
  background-image: url("~/assets/images/home/akabane.jpg");
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
  background-blend-mode: darken;
  width: 100vw;
  height: calc(100vh - 104px);
  margin: 0;
  padding: 0;
}

/* スマートフォンで見たときは"sp"のclassがついた画像が表示される */
@media only screen and (max-width: 750px) {
  .first-view-sp {
    position: relative;
    /* background-color: rgb(96, 130, 145); */
    background-color: rgb(183, 204, 219);
    background-image: url("~/assets/images/home/akabane_sp.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-blend-mode: darken;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .top-title h5 {
    font-size: 25px;
    font-family: "Rock Salt", cursive;
  }
  .top-title h2 {
    font-size: 40px;
    margin-bottom: 5px;
    font-family: "Rock Salt", cursive;
  }
  .title-summery {
    font-family: "Rock Salt", cursive;
    font-size: 12px;
    line-height: 20px;
  }
}

@media only screen and (min-width: 751px) {
  .top-title h5 {
    font-size: 30px;
    font-family: "Rock Salt", cursive;
  }
  .top-title h2 {
    font-size: 50px;
    margin-bottom: 5px;
    font-family: "Rock Salt", cursive;
  }
  .title-summery {
    width: 500px;
    font-family: "Rock Salt", cursive;
    line-height: 20px;
  }
}

.top-title {
  position: relative;
  line-height: 60px;
}
.top-title::after {
  content: "";
  position: absolute;
  z-index: 2;
  width: 150px;
  height: 150px;
  top: 25px;
  left: 0;
  background-image: url("~/assets/images/logo/s_logo_opacity.png");
  background-size: contain;
  opacity: 0.4;
}

.top-title hr {
  color: black;
  margin-bottom: 5px;
}

/* 右ボーダー */
.border {
  height: 100%;
  top: 0;
  right: 0;
  transform: translate3d(0, -100%, 0);
  margin-top: 15px;
  margin-bottom: 5px;
}
.border:before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  border-bottom: solid 2px #000;
  animation: border_anim 3s linear forwards;
}

@keyframes border_anim {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
