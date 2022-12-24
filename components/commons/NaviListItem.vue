<template>
  <div class="navigation-item">
    <nuxt-link :to=to class="nuxt-link">
      <v-icon class="v-icon">{{ icon }}</v-icon>
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
</script>
<style scoped>
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
