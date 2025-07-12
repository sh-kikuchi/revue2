<script setup>
import { reactive, ref } from 'vue'
import 'revuekitz/dist/style.css' // Import styles
import { LayoutHeader,LayoutFooter } from 'revuekitz'
import { GridColumn } from 'revuekitz'
import { GridRow } from 'revuekitz'
import { NavBarItem } from 'revuekitz'
import { NavBar } from 'revuekitz'
import Popup from '@/components/local/layouts/Popup.vue';
import { mdiInformationOutline,mdiApplication,mdiFountainPen,mdiPalette,mdiCamera,mdiLabel,mdiSync,mdiFileAccount,mdiAlphaGBoxOutline,mdiController,mdiClock,mdiMusicNote,mdiNote} from '@mdi/js';

const showNavBar = () => {
  state.navBarVisible = true;
};

const closeNavBar = () => {
  state.navBarVisible = false;
};

const listItems = ref([
    {
      to: "/about",
      icon: mdiInformationOutline,
      linkName: "About",
    },
    {
      to: "/projects",
      icon: mdiApplication,
      linkName: "Projs",
    },
    // {
    //   to: "/techs",
    //   icon: mdiFountainPen,
    //   linkName: "Techs",
    // },
    {
      to: "/designs",
      icon: mdiPalette,
      linkName: "Designs",
    }
]);
const listSubItems = ref([
    {
      to: "/landscapes",
      icon: mdiCamera,
      linkName: "Landscapes",
    },
    {
      to: "/labels",
      icon: mdiLabel,
      linkName: "Labels",
    },
    {
      to: "/converts",
      icon: mdiSync,
      linkName: "Convert",
    },
    {
      to: "/careers",
      icon: mdiFileAccount,
      linkName: "Careers",
    },
    {
      to: "/generators",
      icon: mdiAlphaGBoxOutline,
      linkName: "generators",
    },
    {
      to: "/game",
      icon: mdiController,
      linkName: "Games",
    },
    {
      to: "/times",
      icon: mdiClock,
      linkName: "Times",
    },
    {
      to: "/sounds",
      icon: mdiMusicNote,
      linkName: "sounds",
    },
    {
      to: "/notes",
      icon: mdiNote,
      linkName: "notes",
    },
]);
  
const state = reactive({
  navBarVisible: false,
});
</script>
<template>
   <!-- Navigation -->
    <NavBar 
      :isVisible="state.navBarVisible" 
      @close="closeNavBar"
    >
      <div class="nav-bar-content">
        <nuxt-link to='/' class="nuxt-link" @click="closeNavBar">
            <div class="py-1">
              <img src="@/assets/images/logo/s_logo.png" />
              <label class="home-title">Home</label>
          </div>
        </nuxt-link>
        <div class="pa-0" v-for="(listItem,index) in listItems" :key=index @click="closeNavBar">
          <nuxt-link  :to= listItem.to class="nuxt-link" @click="closeNavBar">
            <NavBarItem
              class="flex justify-center"
              :icon=listItem.icon
              :linkName=listItem.linkName />
          </nuxt-link>
        </div>
        <Popup>
          <template v-slot:popupBtn>
            <div class="andmore">&hellip;</div>
          </template>
          <template v-slot:popupContent>
            <GridRow style="width: 250px;">
              <GridColumn
                v-for="(listSubItem, index) in listSubItems"
                :key="index"
                :cols="4"
                :sm_cols="4"
                :lg_cols="4"
                class="pa-1"
              >
                <div class="pa-0 flex flex-wrap">
                  <nuxt-link
                    :to="listSubItem.to"
                    class="nuxt-link"
                    @click="closeNavBar"
                  >
                    <NavBarItem
                      :to="listSubItem.to"
                      :icon="listSubItem.icon"
                      :linkName="listSubItem.linkName"
                    />
                  </nuxt-link>
                </div>
              </GridColumn>
            </GridRow>
          </template>
        </Popup>
      </div>
  </NavBar>
  <!-- Header -->
  <LayoutHeader class="header" style="height: 50px; padding: 0;">
    <h1 class="ml-2">Re:Vue</h1>
    <div>
      <div class="three-lines mr-2" @click="showNavBar">&equiv;</div>
    </div>
  </LayoutHeader>
  <!-- Body -->
  <main>
      <NuxtPage />
  </main>
  <!-- Footer -->
  <LayoutFooter style="background-color: rgb(62, 60, 65);height: 25px;">2021-{{ new Date().getFullYear() }}-<strong>Re:Vue</strong></LayoutFooter>
</template>

<style scoped>
main{
 height: calc(100vh - 75px);
  background-color: rgb(183, 204, 219);
  overflow-y: auto;
  -ms-overflow-style: none;
    scrollbar-width: none;
}
main::-webkit-scrollbar{
  display: none;
}
.nuxt-link{
  width: 54px;
  color: black;
}
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
.navigation-item:active {
  background-color: lightgray;
}

.link-name {
  font-size: 8px !important;
  text-align: center;
  color:grey;
}
.andmore{
   text-align: center;
   font-size: 20px;
   font-weight: 600;

}
h1{
  font-size: 25px;
}
h2{
  color:black;
}
.nuxt-link{
  text-decoration: none;
}

.three-lines{
  display: flex;
  padding-top: 5px;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 50px;
  font-weight: 400;
  border-radius: 50%;
}
.three-lines:hover{
  background-color: lightgray;
}
.nav-bar-content{
  height: 100vh;
}
.flex{
  display: flex;
}
.flex-wrap{
  width: 50px;
  display: flex;
  flex-wrap: wrap; 
}

.justify-center{
  justify-content: center;
}
</style>
