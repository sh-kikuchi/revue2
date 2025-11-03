<script setup>
import 'revuekitz/dist/style.css'
import appLogo from '@/assets/images/logo/app_logo.png'

definePageMeta({
  layout: 'default',
});
</script>

<template>
  <section class="first-view">
    <div class="first-view-wrap">
      <!-- スマホ時のロゴ -->
      <img :src="appLogo" alt="Re:Vue logo" class="logo-overlay" />

      <!-- PC時のタイトル -->
      <div class="first-view-title-area">
        <h2 class="title bruno-ace-regular">Re:Vue</h2>
        <p class="title-summery rock-salt">
          Re:Vue is a technical anthology shaped by the grand experiments— 
          each creation unfolding with its own brilliance, like a ranunculus in bloom.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Allura&family=Anton&family=Rock+Salt&family=Teko:wght@500&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');

/* --- スマホ --- */
@media only screen and (max-width: 750px) {
  .first-view-title-area {
    display: none;
  }

  .first-view-wrap {
    position: relative;
    width: 100vw;
    height: calc(100vh - 75px);
    background-color: rgb(183, 204, 219);
    background-image: url("@/assets/images/home/akabane.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-blend-mode: darken;
    border: 1px solid black;
  }

  .logo-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 160px;
    opacity: 0.9;
  }
}

/* --- PC --- */
@media only screen and (min-width: 751px) {
  .first-view {
    display: flex;
    align-items: center;
    width: 100vw;
    height: calc(100vh - 65px);
  }

  .first-view-wrap {
    position: relative;
    width: 800px;
    height: 400px;
    margin: 0 auto;
    background-color: rgb(183, 204, 219);
    background-image: url("@/assets/images/home/akabane.jpg");
    background-repeat: no-repeat;
    background-position: right;
    background-size: cover;
    background-blend-mode: darken;
    border: 1px solid black;
  }

  .logo-overlay {
    display: none;
  }

  .first-view-title-area {
    width: 400px;
    text-align: center;
  }

  .title-summery {
    font-size: 12px;
  }
}

/* --- フォント --- */
.rock-salt {
  font-family: "Rock Salt", cursive;
}
.bruno-ace-regular {
  font-family: "Bruno Ace", sans-serif;
  font-weight: 400;
}
</style>
