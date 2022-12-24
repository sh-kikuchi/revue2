<template>
  <v-navigation-drawer rail>
    <v-list-item prepend-avatar="mdi-home" nav>
    </v-list-item>
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
<script setup>
import { reactive, ref } from 'vue'
import NavListItem from '../../components/commons/NaviListItem.vue';
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
  ]
});
</script>
<style scoped>
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
