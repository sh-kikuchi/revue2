<script setup>
import { reactive, ref } from 'vue'
import NavListItem from '@/components/global/layouts/NavListItem.vue';
const menu = ref(false);
const state = reactive({
  listItems: [
    {
      to: "/myApps",
      icon: "mdi-application",
      linkName: "MyApps",
    },
    {
      to: "/techs",
      icon: "mdi-fountain-pen",
      linkName: "Techs",
    },
    {
      to: "/designs",
      icon: "mdi-palette",
      linkName: "Designs",
    },
  ],
  subItems: [
    {
      to: "/landscapes",
      icon: "mdi-camera",
      linkName: "Landscapes",
    },
    {
      to: "/labels",
      icon: "mdi-label",
      linkName: "Labels",
    },
    {
      to: "/converts",
      icon: "mdi-sync",
      linkName: "Convert",
    },
    {
      to: "/careers",
      icon: "mdi-file-account",
      linkName: "Careers",
    },
    {
      to: "/generators",
      icon: "mdi-alpha-g-box-outline",
      linkName: "generators",
    },
    {
      to: "/game",
      icon: "mdi-controller",
      linkName: "Games",
    },
    {
      to: "/times",
      icon: "mdi-clock",
      linkName: "Times",
    },
    {
      to: "/sounds",
      icon: "mdi-music-note",
      linkName: "sounds",
    },
    {
      to: "/notes",
      icon: "mdi-note",
      linkName: "notes",
    },
  ]
});
</script>
<template>
  <v-navigation-drawer rail>
    <nuxt-link to='/' class="nuxt-link">
      <div class="py-1">
        <img src="@/assets/images/logo/s_logo.png" />
        <label class="home-title">Home</label>
      </div>
    </nuxt-link>
    <v-divider></v-divider>
    <v-list nav>
      <v-list-item class="pa-0" v-for="(listItem,index) in state.listItems" :key=index >
        <NavListItem
          :to= listItem.to
          :icon=listItem.icon
          :linkName=listItem.linkName />
      </v-list-item>
        <div class="text-center">
          <v-menu v-model="menu" location="end">
          <!-- <v-menu v-model="menu" :close-on-content-click="false" location="end"> -->
            <template v-slot:activator="{ props }">
              <v-icon size="30" v-bind="props">mdi-dots-horizontal</v-icon>
            </template>
            <v-card min-width="300">
              <v-row class="ml-8 bg-white" no-gutters>
                <v-col v-for="(subItem, index) in state.subItems" router exact :key="index" cols="4" class="text-center" >
                   <NavListItem
                     class="py-3"
                    :to= subItem.to
                    :icon=subItem.icon
                    :linkName=subItem.linkName />
                </v-col>
              </v-row>
            </v-card>
          </v-menu>
        </div>
    </v-list>
  </v-navigation-drawer>
</template>
<style scoped>

.nuxt-link img{
  display: block;
  width: 25px;
  height: 25px;
  margin: 0 auto;
}
.nuxt-link label{
  margin-top: 0;
  text-align: center;
  font-size: 10px;
}
.navigation-item{
  display: flex;
  justify-content: center;
  margin: 0 auto;
}
.navigation-item:active{
  background-color: lightgray;
}
.nuxt-link{
  color: grey;
  text-decoration: none;
}
.link-name{
  font-size: 10px;

}
</style>
