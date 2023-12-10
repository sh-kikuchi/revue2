<template>
  <div class="navigation-item" @click="close">
    <nuxt-link :to=to class="nuxt-link"  >
      <span :class="'icon-wrapper mdi ' + icon"></span>
      <!-- <v-icon class="v-icon">{{ icon }}</v-icon> -->
      <div class="link-name">{{ linkName }}</div>
    </nuxt-link>
  </div>
</template>
<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true,
    default: '/'
  },
  icon: {
    type: String,
    required: true,
    default: 'mdi-vuetify'
  },
  linkName: {
    type: String,
    required: true,
    default: 'vuetify'
  },
})
const emits = defineEmits(['close']);
const close = () => {
  emits('close');
}
</script>
<style scoped>
.icon-wrapper{
 font-size: 25px;
  display: flex;
  justify-content: center;
}

.navigation-item:active {
  background-color: lightgray;
}

.nuxt-link {
  color: grey;
  text-decoration: none;
}

.v-icon{
  display: block;
  width:24px;
  margin:0 auto;
}

.link-name {
  font-size: 8px;
  text-align: center;
}
</style>
