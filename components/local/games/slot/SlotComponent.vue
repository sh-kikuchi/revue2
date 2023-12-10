<!-- <template>
  <section class="panel">
    <img :src="panda" />
    <div class="stop" @click="stop()" :class="{ inactive: state.isSelected }"></div>
  </section>
</template>
<script setup>
import lesserPanda from '@/assets/images/games/lesserPanda.png'
import lion from '@/assets/images/games/lion.jpg'
import panda from '@/assets/images/games/panda.png'

const state = reactive({
  images: [
    lesserPanda,
    lion,
    panda,
  ],
  image: lesserPanda,
  timeoutId: "",
  isSelected: true,
})

const getRandomImage = () => {
  state.image = state.images[Math.floor(Math.random() * state.images.length)];
}

const spin = () => {
  state.timeoutId = setTimeout(() => {
    getRandomImage();
    spin();
  }, 10);
}

const stop = () => {
  if (state.isSelected) {
    return;
  }
  clearTimeout(state.timeoutId);
  state.isSelected = true;
}

const activate = () =>  {
  state.isSelected = false;
}

</script> -->
<template>
  <section class="panel">
    <img :src="image" />
    <div class="stop" @click="stop()" :class="{ inactive: isSelected }"></div>
  </section>
</template>
<script>
import lesserPanda from '@/assets/images/games/lesserPanda.png'
import lion from '@/assets/images/games/lion.jpg'
import panda from '@/assets/images/games/panda.jpg'
export default {
  //コンポーネント
  data() {
    return {
      images: [
        lesserPanda,
        lion,
        panda,
      ],
      image: lesserPanda,
      timeoutId: "",
      isSelected: true,
    };
  },
  methods: {
    getRandomImage() {
      this.image = this.images[Math.floor(Math.random() * this.images.length)];
    },
    spin() {
      this.timeoutId = setTimeout(() => {
        this.getRandomImage();
        this.spin();
      }, 10);
    },
    stop() {
      if (this.isSelected) {
        return;
      }
      clearTimeout(this.timeoutId);
      this.isSelected = true;
    },
    activate() {
      this.isSelected = false;
    },
  },
};
</script>
