<script setup>
  import 'revuekitz/dist/style.css'
  import { SvgIcon } from 'revuekitz'
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
<template>
  <div class="navigation-item" @click="close">
    <nuxt-link :to=to class="nuxt-link"  >
      <div class="flex justify-center">
        <SvgIcon               
          :path="icon"
          size="32" 
        />
      </div>

      <div class="link-name">{{ linkName }}</div>
    </nuxt-link>
  </div>
</template>
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
