<template>
  <section class="first-view">
    <div class="first-view-wrap">
      <div class="first-view-title-area">
        <h2 class="title bruno-ace-regular">Re:Vue</h2>
        <p class="title-summery rock-salt">
          Re:Vue is a technical anthology shaped by the grand experiments— each creation unfolding with its own brilliance, like a ranunculus in bloom.
        </p>
      </div>
    </div>
  </section>
</template>
<script setup>
import 'revuekitz/dist/style.css'
definePageMeta({
  layout: 'default',
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Allura&family=Anton&family=Rock+Salt&family=Teko:wght@500&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');

/* スマートフォン(sp)用 */
@media only screen and (max-width: 750px) {
  .first-view {
    width: 100vw;
    height: calc(100vh - 75px);
    background-color: rgb(183, 204, 219);
    background-image: url("@/assets/images/home/akabane_sp.jpg");
    background-position: center center;  /* 中央に配置 */
    background-size: cover;               /* 全画面覆う */
    background-blend-mode: darken;
  }

  .first-view-wrap {
    display: none;
  }
}

/* PC用 */
@media only screen and (min-width: 751px) {
  .first-view {
    display: flex;
    align-items: center;
    width: 100vw;
    height: calc(100vh - 65px);
  }

  .first-view-wrap{
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

  .first-view-title-area{
    width: 400px;
  }
  
  .title{
    text-align: center;
  }

  .title-summery {
    font-size: 12px;
    text-align: center;
  }
}

/* フォント */
.rock-salt{
  font-family: "Rock Salt", cursive;
}
.bruno-ace-regular {
  font-family: "Bruno Ace", sans-serif;
  font-weight: 400;
  font-style: normal;
}

</style>
