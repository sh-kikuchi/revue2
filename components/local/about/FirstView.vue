<script setup>
import 'revuekitz/dist/style.css'
import { GridRow } from 'revuekitz'
import { GridColumn } from 'revuekitz'
</script>
<template>
  <section id="firstView">
    <GridRow style="width: 250px; display: flex; justify-content: center;">
      <GridColumn>
        <div>
          <div class="first-view-text text-center google-font">Re:Vue</div>
        </div>
      </GridColumn>
      <GridColumn></GridColumn>
    </GridRow>     
  </section>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Allura&family=Anton&family=Rock+Salt&family=Teko:wght@400&display=swap');

ul{
    padding-left: 0;
}

li {
  color: black;
  list-style: none;
}

.first-view-text{
  font-size: 50px;
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
