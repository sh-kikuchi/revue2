<template>
  <div class="navigation-item" @click="close">
    <nuxt-link :to=to class="nuxt-link"  >
      <Icon class="icon-wrapper" :path="icon" :size=26 />
      <div class="link-name">{{ linkName }}</div>
    </nuxt-link>
  </div>
</template>
<script setup>
import Icon from '@/components/global/images/Icon';
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

.navigation-item{
  margin-top: 5px;
  margin-bottom: 5px;
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
